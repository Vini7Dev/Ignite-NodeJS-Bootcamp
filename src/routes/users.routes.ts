import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/updload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserController from '../models/accounts/usecases/createUser/CreateUserController';
import UpdateUserAvatarController from '../models/accounts/usecases/updateUserAvatar/UpdateUserAvatarController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

userRoutes.post('/', createUserController.handle);

userRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle,
);

export default userRoutes;
