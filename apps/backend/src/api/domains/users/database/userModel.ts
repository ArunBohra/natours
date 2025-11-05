import bcrypt from 'bcryptjs';
import { Model, Schema, model } from 'mongoose';
import validator from 'validator';

import { IBaseDocument } from '../../../interfaces/baseDocument';

const userSchema = new Schema({
    name: {
        type: String,
        min: [2, 'Name must be at least 2 characters long'],
    },
    email: {
        type: String,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'Please provide a valid email',
        },
        unique: [true, 'An account already exists with this email, please use a different email'],
    },
    password: {
        type: String,
        min: [8, 'Password must be at least 8 characters long'],
    },
    image: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: false,
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
});

userSchema.pre<IUserDocument>('save', async function (next) {
    if (this.isNew && this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

export interface IUser {
    name: string;
    email: string;
    password: string;
    image?: string;
    verified?: boolean;
    verificationToken?: string;
    resetPasswordToken?: string;
}

export interface IUserDocument extends IUser, IBaseDocument {}

interface IUserModel extends Model<IUserDocument> {}

export const userModel = model<IUserDocument, IUserModel>('User', userSchema);
