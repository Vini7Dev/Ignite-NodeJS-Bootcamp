import IUserResponseDTO from '@models/accounts/dtos/IUserResponseDTO';
import UserMap from '@models/accounts/mapper/UserMap';
import IUsersRepository from '@models/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
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
