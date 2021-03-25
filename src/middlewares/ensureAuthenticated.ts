import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import UsersRepository from '../models/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

const ensureAuthenticated = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const bearerToken = request.headers.authorization;

    if (!bearerToken) {
        throw new AppError('token not found.', 401);
    }

    const [, token] = bearerToken.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            '53267135b3e867e1c80c9ed5e9556a85',
        ) as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('user does not extis.', 401);
        }

        next();
    } catch {
        throw new AppError('invalid token.', 401);
    }
};

export default ensureAuthenticated;
