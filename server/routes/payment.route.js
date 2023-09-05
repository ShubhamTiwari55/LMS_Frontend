import {Router} from 'express';
import { isLoggedIn,authorizedRoles } from '../middleware/auth.middleware.js';
import {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    getAllPayments
} from '../controllers/payment.controller.js'
const router = Router();

router
    .route('/razorpay-key')
    .get(isLoggedIn,
        getRazorpayApiKey);

router
    .route('/subscribe')
    .post(isLoggedIn,
        buySubscription);

router
    .route('/verify')
    .post(isLoggedIn,
        verifySubscription);

router
    .route('/unsubscribe')
    .post(isLoggedIn,
        cancelSubscription);

router
    .route('/')
    .get(isLoggedIn,
        authorizedRoles('ADMIN'),
        getAllPayments);

export default router;