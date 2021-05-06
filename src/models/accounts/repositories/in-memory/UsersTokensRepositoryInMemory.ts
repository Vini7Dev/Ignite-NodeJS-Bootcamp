import ICreateUserTokenDTO from '@models/accounts/dtos/ICreateUserTokenDTO';
import UserToken from '@models/accounts/infra/typeorm/entities/UserToken';
import IUsersTokensRepository from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private storage: UserToken[];

    constructor() {
        this.storage = [];
    }

    public async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserToken> {
        const findedUserToken = this.storage.find(
            userToken =>
                userToken.refresh_token === refresh_token &&
                userToken.user_id === user_id,
        );

        return findedUserToken;
    }

    public async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const findedUserToken = this.storage.find(
            userToken => userToken.refresh_token === refresh_token,
        );

        return findedUserToken;
    }

    public async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            user_id,
            refresh_token,
            expires_date,
        });

        this.storage.push(userToken);

        return userToken;
    }

    public async deleteById(id: string): Promise<void> {
        const userTokenIndex = this.storage.findIndex(
            userToken => userToken.id === id,
        );

        this.storage.slice(userTokenIndex, 1);
    }
}

export default UsersTokensRepositoryInMemory;
