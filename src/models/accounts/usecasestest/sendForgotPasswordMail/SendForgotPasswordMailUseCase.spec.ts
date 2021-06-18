import UsersRepositoryInMemory from '@models/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@models/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import DayJsProvider from '@shared/container/providers/DateProvider/implementations/DayjsProvider';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let dateProvider: DayJsProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('SendForgotPasswordMail', () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        dateProvider = new DayJsProvider();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepository,
            usersTokensRepository,
            mailProvider,
            dateProvider,
        );
    });

    it('shoud be able to send a forgot mail to user', async () => {
        const sendMailSpy = spyOn(mailProvider, 'sendMail');
        const createUserTokenSpy = spyOn(usersTokensRepository, 'create');

        const user = await usersRepository.create({
            name: 'Example Name',
            email: 'example@mail.com',
            password: 'pass123',
            driver_license: '1234',
        });

        await sendForgotPasswordMailUseCase.execute(user.email);

        expect(sendMailSpy).toHaveBeenCalled();
        expect(createUserTokenSpy).toHaveBeenCalled();
    });

    it('shoud not be able to send mail if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('invalid-email'),
        ).rejects.toEqual(new AppError('user not found.', 404));
    });
});
