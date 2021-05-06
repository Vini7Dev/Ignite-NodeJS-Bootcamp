import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@models/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@models/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import IMailProvider from '@shared/container/providers/MailProvider/IMailPrivider';

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('DateProvider')
        private dateProvider: IDateProvider,
    ) {}

    public async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('user not found.', 404);
        }

        const token = uuidv4();
        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        await this.mailProvider.sendMail(
            email,
            'Recuperação de Senha',
            `Segue o link da recuperação de senha: ${token}`,
        );
    }
}

export default SendForgotPasswordMailUseCase;
