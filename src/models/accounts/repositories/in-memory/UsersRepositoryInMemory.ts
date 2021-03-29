import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    public async findById(id: string): Promise<User> {
        const user = this.users.find(usr => usr.id === id);

        return user;
    }

    public async findByEmail(email: string): Promise<User> {
        const user = this.users.find(usr => usr.email === email);

        return user;
    }

    public async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
        });

        this.users.push(user);

        return user;
    }
}

export default UsersRepositoryInMemory;
