import AppError from '@shared/errors/AppError';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let usersRepository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
        createUserUseCase = new CreateUserUseCase(usersRepository);
    });

    it('shoud be able to authenticate', async () => {
        const user = {
            name: 'Example Account',
            email: 'example@mail.com',
            password: 'pass123',
            driver_license: 'driver-license',
        };

        await createUserUseCase.execute(user);

        const response = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(response).toHaveProperty('token');
        expect(response).toHaveProperty('user');
    });

    it('shoud not be able to authenticate with a nonexitent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'non-existent-emal',
                password: 'non-existent-password',
            }),
        ).rejects.toEqual(new AppError('email or password incorrect.'));
    });

    it('shoud not be able to authenticate with invalid password', async () => {
        const user = {
            name: 'Example Account',
            email: 'example@mail.com',
            password: 'pass123',
            driver_license: 'driver-license',
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrect-password',
            }),
        ).rejects.toEqual(new AppError('email or password incorrect.'));
    });
});
