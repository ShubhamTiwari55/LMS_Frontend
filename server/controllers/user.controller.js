import User from '../models/user.models.js';
import AppError from '../utils/AppError.js';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

const cookieOptions = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true
};

const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            throw new AppError('All fields are required!', 400);
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new AppError('Email already registered!', 400);
        }

        const user = await User.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
            }
        });

        if(!user){
            throw new AppError('User registration failed, please try again', 400);
        }

        // TODO: Upload user picture

        if(req.file){
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: '250',
                    gravity: 'faces',
                    crop: 'fill'
                });
                if(result){
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    //remove file from local server
                    fs.rm(`uploads/${req.file.filename}`);
                }

            }catch(e){
                return next(new AppError(e.message || 'Upload failed, please try again', 400));
            }
        }
        await user.save();
        // TODO: Set JWT token in a cookie
        const token = await user.generateJWTToken();
        res.cookie('token', token, cookieOptions);

        user.password = undefined;
        res.status(200).json({
            success: true,
            message: 'User registered successfully!',
            user
        });
    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return next(new AppError('All fields are required!', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !user.comparePassword(password)) {
            throw new AppError('Email or password do not match', 400);
        }

        const token = await user.generateJWTToken();
        user.password = undefined;

        res.cookie('token', token, cookieOptions);
        res.status(201).json({
            success: true,
            message: 'User logged in successfully!',
            user
        });
    } catch (error) {
        return next(error);
    }
};

const logout = (req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
};

const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'User details',
            user
        });
    } catch (error) {
        return next(error);
    }
};

//PART A: Email -> validate in database -> generate token -> send email with new url containing token + save token//

const forgotPassword = async(req,res,next) => {
    const {email} = req.body;

    if(!email){
        return next(
            new AppError('Email is required', 400)
        );
    }
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError('User is not registered', 400));
    }

    const resetToken = await user.generatePassToken();
    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = 'Reset Password';
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;
    console.log(resetPasswordUrl);
    try{
        //TODO: create sendEmail
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully!`
        })
    }catch(e){
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        await user.save();
        return next(new AppError(e.message, 400));
    }
}

//PART B: Get token from url + new password -> verify token in database -> update password in database//

const resetPassword = async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return next(
            new AppError('Token is invalid or expired, please try again', 400)
        )
    }

    user.password = password;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })
}

const changePassword = async function(req,res,next){
    
}
export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    sendEmail,
};
