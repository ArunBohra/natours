import { injectable } from 'inversify';

import { UserRepositoryPort } from '@api/domains/users/database/userRepositoryPort';

import { IUser, userModel } from './userModel';

@injectable()
export class UserRepository implements UserRepositoryPort {
    async createUser(userData: IUser) {
        const user = await userModel.create(userData);
        return user;
    }

    async findUserById(userId: string) {
        return await userModel.findById(userId);
    }

    async findUserByEmail(email: string) {
        return await userModel.findOne({ email });
    }

    async findUserByVerificationToken(token: string) {
        return await userModel.findOne({ verificationToken: token });
    }

    async updateUser(userId: string, updateData: Partial<IUser>) {
        return await userModel.findByIdAndUpdate(userId, updateData, {
            new: true,
        });
    }

    async deleteUser(userId: string) {
        return await userModel.findByIdAndDelete(userId);
    }
}
