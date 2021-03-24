import ICreateSpecificationsDTO from '../../dtos/ICreateSpecificationsDTO';
import Specification from '../../entities/Specification';
import ISpecificationsRepository from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private static INSTANCE: SpecificationsRepository;

    private specifications: Specification[];

    private constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }

        return SpecificationsRepository.INSTANCE;
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
