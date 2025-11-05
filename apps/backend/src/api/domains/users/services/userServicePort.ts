export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

interface CreateUserOutputDTO extends Omit<CreateUserDTO, 'password'> {
    id: string;
    jwt: string;
}

export interface UserServicePort {
    createUser: (userData: CreateUserDTO) => Promise<CreateUserOutputDTO>;
    loginUser: (credentials: { email: string; password: string }) => Promise<CreateUserOutputDTO>;
    verifyUser: (token: string) => Promise<void>;
    regenerateVerificationToken: (userId: string) => Promise<void>;
}
