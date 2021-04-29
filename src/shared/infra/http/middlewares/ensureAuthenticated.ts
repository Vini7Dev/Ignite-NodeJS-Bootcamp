import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UsersRepository from '@models/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';

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
        const { secret } = auth.token;

        const { sub: user_id } = verify(token, secret) as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('user does not extis.', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('invalid token.', 401);
    }
};

export default ensureAuthenticated;
