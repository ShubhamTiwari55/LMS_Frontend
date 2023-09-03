import express from 'express';
const router = express.Router();
import {
    register,
    login,
    logout,
    getProfile
} from '../controllers/user.controller.js';
import isLoggedIn from '../middleware/auth.middleware.js';

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/me', isLoggedIn, getProfile);

export default router;
