import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';
import AppError from '../../../../errors/AppError';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<User> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new AppError('user email already exits.');
        }

        const passwordHash = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });

        return user;
    }
}

export default CreateUserUseCase;
