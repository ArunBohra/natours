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
}
