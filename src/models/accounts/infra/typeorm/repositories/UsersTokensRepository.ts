import { getRepository, Repository } from 'typeorm';
import ICreateUserTokenDTO from '@models/accounts/dtos/ICreateUserTokenDTO';
import IUsersTokensRepository from '@models/accounts/repositories/IUsersTokensRepository';
import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    public async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserToken> {
        const findedUserToken = await this.repository.findOne({
            user_id,
            refresh_token,
        });

        return findedUserToken;
    }

    public async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const findedToken = await this.repository.findOne({ refresh_token });

        return findedToken;
    }

    public async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const createdUserToken = this.repository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        await this.repository.save(createdUserToken);

        return createdUserToken;
    }

    public async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export default UsersTokensRepository;
