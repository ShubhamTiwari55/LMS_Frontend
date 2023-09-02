const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    getProfile
} = require('../controllers/user.controller');
const { isLoggedIn } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/me', isLoggedIn, getProfile);

module.exports = router;