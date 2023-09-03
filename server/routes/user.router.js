import express from 'express';
const router = express.Router();
import {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword
} from '../controllers/user.controller.js';
import isLoggedIn from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/me', isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.post('change-password', isLoggedIn, changePassword);

export default router;
