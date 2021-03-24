import ICreateSpecificationsDTO from '../../dtos/ICreateSpecificationsDTO';
import Specification from '../../entities/Specification';

interface ISpecificationsRepository {
    findByName(name: string): Specification;
    list(): Specification[];
    create({ name, description }: ICreateSpecificationsDTO): Specification;
}

export default ISpecificationsRepository;
