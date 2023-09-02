const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
});

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    comparePassword : async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword, this.password);
    },
    generateJWTToken: function(){
        return JsonWebTokenError.sign(
            {id: this._id, role: this.role, email: this.email, subscription: this.subscription},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
}

const User = model('User', userSchema);
module.exports = User;