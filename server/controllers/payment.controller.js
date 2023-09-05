import Payment from "../models/payment.model.js";
import { razorpay } from "../server.js"
import AppError from "../utils/AppError.js"
import crypto from 'crypto';

const getRazorpayApiKey = async (req,res,next)=>{
    try{
        res.status(200).json({
            success: true,
            message: 'Razorpay API Key',
            key: process.env.RAZORPAY_KEY_ID
        })
    }catch(e){
        return next(
            new AppError(e.message, 400)
        )
    }
}
const buySubscription = async (req,res,next)=>{
    try{
        const {id} = req.user;
        const user = await UserActivation.findById(id);
        if(!user){
            return next(
                new AppError('Unauthorized, please login', 500)
            )
        }
        if(user.role === 'ADMIN'){
            return next(
                new AppError('Admin cannot purchase a subscription', 400)
            )
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1
        })

        //update user model with subscription
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Subscirbed Successfully!'
        })
    }catch(e){
        return next(
            new AppError(e.message, 400)
        )
    }
}
const verifySubscription = async (req,res,next)=>{
    try{
        const {id} = req.user;
        const user = await UserActivation.findById(id);
        if(!user){
            return next(
                new AppError('Unauthorized, please login', 500)
            )
        }
        const {
            razorpay_payment_id, razorpay_signature, razorpay_subscription_id
        } = req.body;

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${razorpay_subscription_id}`);

            if(generatedSignature !== razorpay_signature){
                return next(
                    new AppError('Payment not verified, please try again',500)
                )
            }

            //Record payment details in payemnt collection
            await Payment.create({
                razorpay_payment_id,
                razorpay_signature,
                razorpay_subscription_id
            });

            //Update user record with subscription status
            user.subscription.status = 'active';
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Payment verified successfully!'
            })
    }catch(e){
        return next(
            new AppError(e.message, 400)
        )
    }
}
const cancelSubscription = async (req,res,next)=>{
    try{
        const {id} = req.user;
        const user = await UserActivation.findById(id);
        if(!user){
            return next(
                new AppError('Unauthorized, please login', 500)
            )
        }

        const subscriptionId = user.subscription.id;
        const subscription = await razorpay.subscriptions.cancel(subscriptionId);

        user.subscription.status = subscription.status;

        await user.save();
        res.status(200).json({
            success: true,
            message: 'Subscription cancelled successfully!'
        })
    }catch(e){
        return next(
            new AppError(e.message, 400)
        )
    }
}
const getAllPayments = async (req,res,next)=>{
    try{
        const {count} = req.query;
        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10,
    });

    res.status(200).json({
        success: true,
        message: 'All Payments',
        payments: subscriptions
    })
    }catch(e){
        return next(
            new AppError(e.message, 400)
        )
    }
}

export{
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    getAllPayments
}