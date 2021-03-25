import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
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
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const findedUser = await this.usersRepository.findByEmail(email);

        if (!findedUser) {
            throw new Error('email or password incorrect.');
        }

        const passwordMatch = await compare(password, findedUser.password);

        if (!passwordMatch) {
            throw new Error('email or password incorrect.');
        }

        const token = sign({}, '53267135b3e867e1c80c9ed5e9556a85', {
            subject: findedUser.id,
            expiresIn: '1d',
        });

        return {
            user: {
                name: findedUser.name,
                email: findedUser.email,
            },
            token,
        };
    }
}

export default AuthenticateUserUseCase;
