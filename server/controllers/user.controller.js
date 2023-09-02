const User = require('../models/user.models');
const { default: AppError } = require('../utils/appError');

const register = async (req,res) => {
    const {fullName, email, password} = req.body;

    if(!fullName || !email || !password){
        return next(new AppError('All fields are required!', 400));
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return next(new AppError('Email already registered!', 400));
    }

    const user = User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id: email,
            secure_url: ''
        }
    });
    if(!User){
        return next('User registration failed! Please try again', 400);
    }

    //TODO: upload user picture
    (await user).save();
    //TODO: set JWT token in cookie

    user.password = undefined;
    res.status(200).json({
        success: true,
        message: 'User registered successfully!',
        user
    })
}
const login = () => {
    
}
const logout = () => {
    
}
const getProfile = () => {
    
}
module.exports = {
    register,
    login,
    logout,
    getProfile
}