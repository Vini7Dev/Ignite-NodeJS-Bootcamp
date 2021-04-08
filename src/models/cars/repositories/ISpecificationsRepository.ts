import ICreateSpecificationsDTO from '../dtos/ICreateSpecificationsDTO';
import Specification from '../infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification>;
    findManyById(ids: string[]): Promise<Specification[]>;
    list(): Promise<Specification[]>;
    create(data: ICreateSpecificationsDTO): Promise<Specification>;
}

export default ISpecificationsRepository;
