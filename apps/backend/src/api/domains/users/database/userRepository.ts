import { injectable } from 'inversify';
import { Document, Types } from 'mongoose';

import { UserRepositoryPort } from '@api/domains/users/database/userRepositoryPort';

import { IUser, userModel } from './userModel';

@injectable()
export class UserRepository implements UserRepositoryPort {
    async createUser(userData: IUser) {
        const user = await userModel.create(userData);
        return user;
    }

    async findUserById(userId: string) {
        return await userModel.findById(new Types.ObjectId(userId));
    }

    async findUserByEmail(email: string) {
        return await userModel.findOne({ email });
    }

    async findUserByVerificationToken(token: string) {
        return await userModel.findOne({ verificationToken: token });
    }

    async updateUser(userId: string, updateData: Partial<IUser>) {
        return await userModel.findByIdAndUpdate(new Types.ObjectId(userId), updateData, {
            new: true,
        });
    }

    async deleteUser(userId: string) {
        return await userModel.findByIdAndDelete(new Types.ObjectId(userId));
    }
}
