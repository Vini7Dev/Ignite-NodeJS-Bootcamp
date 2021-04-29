import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import AppError from '@shared/errors/AppError';
import IUsersTokensRepository from '@models/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DateProvider')
        private dateProvider: IDateProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const findedUser = await this.usersRepository.findByEmail(email);

        if (!findedUser) {
            throw new AppError('email or password incorrect.');
        }

        const passwordMatch = await compare(password, findedUser.password);

        if (!passwordMatch) {
            throw new AppError('email or password incorrect.');
        }

        const token = sign({}, auth.token.secret, {
            subject: findedUser.id,
            expiresIn: auth.token.expiresIn,
        });

        const refresh_token = sign({ email }, auth.refresh_token.secret, {
            subject: findedUser.id,
            expiresIn: auth.refresh_token.expiresIn,
        });

        await this.usersTokensRepository.create({
            user_id: findedUser.id,
            refresh_token,
            expires_date: this.dateProvider.addDays(
                auth.refresh_token.expiresDays,
            ),
        });

        return {
            user: {
                name: findedUser.name,
                email: findedUser.email,
            },
            token,
            refresh_token,
        };
    }
}

export default AuthenticateUserUseCase;
