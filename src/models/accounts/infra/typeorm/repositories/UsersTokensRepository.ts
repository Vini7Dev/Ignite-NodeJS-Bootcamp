import { getRepository, Repository } from 'typeorm';
import ICreateUserTokenDTO from '@models/accounts/dtos/ICreateUserTokenDTO';
import IUsersTokensRepository from '@models/accounts/repositories/IUsersTokensRepository';
import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
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
}

export default UsersTokensRepository;
