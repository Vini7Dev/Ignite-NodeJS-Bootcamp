import ICreateSpecificationsDTO from '../dtos/ICreateSpecificationsDTO';
import Specification from '../entities/Specification';

interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification>;
    list(): Promise<Specification[]>;
    create({
        name,
        description,
    }: ICreateSpecificationsDTO): Promise<Specification>;
}

export default ISpecificationsRepository;
