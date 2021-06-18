import { Router } from 'express';
import AuthenticateUserController from '@models/accounts/useCases/authenticateUser/AuthenticateUserController';
import RefreshTokenController from '@models/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/', authenticateUserController.handle);

authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export default authenticateRoutes;
