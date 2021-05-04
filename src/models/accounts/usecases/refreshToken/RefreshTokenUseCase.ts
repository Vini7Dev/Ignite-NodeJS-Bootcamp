import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUsersTokensRepository from '@models/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayLoad {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DateProvider')
        private dateProvider: IDateProvider,
    ) {}

    public async execute(token: string): Promise<string> {
        const { email, sub: user_id } = verify(
            token,
            auth.refresh_token.secret,
        ) as IPayLoad;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token,
        );

        if (!userToken) {
            throw new AppError('refresh token not found.', 404);
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.refresh_token.secret, {
            subject: user_id,
            expiresIn: auth.refresh_token.expiresIn,
        });

        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date: this.dateProvider.addDays(
                auth.refresh_token.expiresDays,
            ),
        });

        return refresh_token;
    }
}

export default RefreshTokenUseCase;
