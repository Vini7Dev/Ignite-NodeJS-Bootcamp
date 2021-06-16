import { Router } from 'express';
import multer from 'multer';
import UpdateUserAvatarController from '@models/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import CreateUserController from '@models/accounts/useCases/createUser/CreateUserController';
import uploadConfig from '@config/updload';
import ProfileUserController from '@models/accounts/useCases/profileUserUseCase/ProfileUserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(uploadConfig);

userRoutes.post('/', createUserController.handle);

userRoutes.get('/', ensureAuthenticated, profileUserController.handle);

userRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle,
);

export default userRoutes;
