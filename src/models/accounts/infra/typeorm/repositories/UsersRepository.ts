import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@models/accounts/repositories/IUsersRepository';
import ICreateUserDTO from '@models/accounts/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    public async findById(id: string): Promise<User> {
        const findedUser = await this.repository.findOne(id);

        return findedUser;
    }

    public async findByEmail(email: string): Promise<User> {
        const findedUser = await this.repository.findOne({ email });

        return findedUser;
    }

    public async create({
        name,
        password,
        email,
        driver_license,
        id,
        avatar,
    }: ICreateUserDTO): Promise<User> {
        const createdUser = this.repository.create({
            name,
            password,
            email,
            driver_license,
            avatar,
            id,
        });

        await this.repository.save(createdUser);

        return createdUser;
    }
}

export default UsersRepository;
