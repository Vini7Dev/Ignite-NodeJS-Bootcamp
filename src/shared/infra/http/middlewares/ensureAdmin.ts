import UsersRepository from '@models/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

const ensureAdmin = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user.is_admin) {
        throw new AppError("user isn't admin.");
    }

    next();
};

export default ensureAdmin;
