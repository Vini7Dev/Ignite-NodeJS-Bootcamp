import ResetPaswordUserController from '@models/accounts/usecases/resetPasswordUser/ResetPasswordUserController';
import SendForgotPasswordMailController from '@models/accounts/usecases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordsRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPaswordUserController();

passwordsRoutes.post('/forgot', sendForgotPasswordMailController.handle);

passwordsRoutes.post('/reset', resetPasswordUserController.handle);

export default passwordsRoutes;
