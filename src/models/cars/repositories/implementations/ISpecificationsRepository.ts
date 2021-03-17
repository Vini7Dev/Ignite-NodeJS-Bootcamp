import ICreateSpecificationsDTO from '../../dtos/ICreateSpecificationsDTO';
import Specification from '../../model/Specification';

interface ISpecificationsRepository {
    findByName(name: string): Specification;
    list(): Specification[];
    create({ name, description }: ICreateSpecificationsDTO): Specification;
}

export default ISpecificationsRepository;
