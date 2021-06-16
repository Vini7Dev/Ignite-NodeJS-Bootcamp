import User from '@models/accounts/infra/typeorm/entities/User';
import IUsersRepository from '@models/accounts/repositories/IUsersRepository';
import { inject } from 'tsyringe';

class ProfileUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);

        return user;
    }
}

export default ProfileUserUseCase;
