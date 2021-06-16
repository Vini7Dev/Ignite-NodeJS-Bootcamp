import IUserResponseDTO from '@models/accounts/dtos/IUserResponseDTO';
import User from '@models/accounts/infra/typeorm/entities/User';
import UserMap from '@models/accounts/mapper/UserMap';
import IUsersRepository from '@models/accounts/repositories/IUsersRepository';
import { inject } from 'tsyringe';

class ProfileUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id);

        return UserMap.toDTO(user);
    }
}

export default ProfileUserUseCase;
