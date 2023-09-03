import User from '../models/user.models.js';
import AppError from '../utils/AppError.js';

const cookieOptions = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true
};

const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required!', 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError('Email already registered!', 400));
    }

    try {
        const user = await User.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: ''
            }
        });

        // TODO: upload user picture
        await user.save();
        // TODO: set JWT token in cookie

        user.password = undefined;
        res.status(200).json({
            success: true,
            message: 'User registered successfully!',
            user
        });
    } catch (error) {
        return next(new AppError('User registration failed! Please try again', 400));
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('All fields are required!', 400));
    }

    try {
        const user = await User.findOne({
            email
        }).select('+password');

        if (!user || !user.comparePassword(password)) {
            return next(new AppError('Email or password do not match', 400));
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
        return next(new AppError('Login failed. Please try again.', 400));
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

        res.status(200).json({
            success: true,
            message: 'User details',
            user
        });
    } catch (error) {
        return next(new AppError('Error fetching user details', 400));
    }
};

export {
    register,
    login,
    logout,
    getProfile
};
