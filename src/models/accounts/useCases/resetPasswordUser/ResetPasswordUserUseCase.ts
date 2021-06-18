import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import IUsersRepository from '@models/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@models/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPaswordUserUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('DateProvider')
        private dateProvider: IDateProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token,
        );

        if (!userToken) {
            throw new AppError('token not found', 404);
        }

        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow(),
            )
        ) {
            await this.usersTokensRepository.deleteById(userToken.id);

            throw new AppError('token expired.');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export default ResetPaswordUserUseCase;
