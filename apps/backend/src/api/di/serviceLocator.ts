import { container } from '@api/di/container';
import { TYPES } from '@api/di/types';
import { UserController } from '@api/domains/users/controllers/userController';

export class ServiceLocator {
    static getUserController() {
        return container.get<UserController>(TYPES.UserController);
    }
}
