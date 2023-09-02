const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"],
        minLength: [5, "Name must be at least 5 chars long"],
        maxLength: [50, "Name should not be longer than 50 chars"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email-id is required"],
        unique: [true, "Mail id must be unique"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        unique: [true, "password must be unique"],
        minLength: [8, "Password must be 8 chars long"],
        select: false
    },
    role:{
        type: String,
        enum: ['USER', 'ADMIN'],
        defualt: 'USER'
    },
    avatar:{
        public_id:{
            type: String
        },
        secure_url:{
            type: String
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
},{
    timestamps: true
})