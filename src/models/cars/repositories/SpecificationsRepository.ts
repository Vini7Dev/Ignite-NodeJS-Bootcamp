import ICreateSpecificationsDTO from '../dtos/ICreateSpecificationsDTO';
import Specification from '../model/Specification';
import ISpecificationsRepository from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    public findByName(name: string): Specification {
        const findedSpecification = this.specifications.find(
            specification => specification.name === name,
        );

        return findedSpecification;
    }

    public list(): Specification[] {
        return this.specifications;
    }

    public create({
        name,
        description,
    }: ICreateSpecificationsDTO): Specification {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);

        return specification;
    }
}

export default SpecificationsRepository;
