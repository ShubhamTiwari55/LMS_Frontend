import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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
        minLength: [8, "Password must be 8 chars long"],
        select: false
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
        type: String,
        status: String
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) { // Pass 'next' to handle errors
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    },
    generateJWTToken: function() {
        return jwt.sign(
            { id: this._id, role: this.role, email: this.email, subscription: this.subscription},
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )
    },

    generatePassToken: async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15*60*1000;  //15 mins from now

        return resetToken;
    }

};

const User = model('User', userSchema);
export default User;
