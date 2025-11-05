import { HydratedDocument } from 'mongoose';

import { IUser, IUserDocument } from '@api/domains/users/database/userModel';

export interface UserRepositoryPort {
    // createUser: (userData: IUser) => Promise<Document & IUserDocument>;
    createUser: (userData: IUser) => Promise<HydratedDocument<IUserDocument>>;
    findUserById: (userId: string) => Promise<HydratedDocument<IUserDocument> | null>;
    findUserByEmail: (email: string) => Promise<HydratedDocument<IUserDocument> | null>;
    findUserByVerificationToken: (token: string) => Promise<HydratedDocument<IUserDocument> | null>;
    updateUser: (
        userId: string,
        userData: Partial<IUser>,
    ) => Promise<HydratedDocument<IUserDocument> | null>;
    deleteUser: (userId: string) => Promise<HydratedDocument<IUserDocument> | null>;
}
