import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import UserToken from '../infra/typeorm/entities/UserToken';

interface IUsersTokensRepository {
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserToken>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
    create(data: ICreateUserTokenDTO): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
}

export default IUsersTokensRepository;
