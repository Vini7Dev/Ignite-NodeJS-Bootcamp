import SendForgotPasswordMailController from '@models/accounts/usecases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordsRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordsRoutes.post('/forgot', sendForgotPasswordMailController.handle);

export default passwordsRoutes;
