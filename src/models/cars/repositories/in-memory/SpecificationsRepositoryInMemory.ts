import ICreateSpecificationsDTO from '@models/cars/dtos/ICreateSpecificationsDTO';
import Specification from '@models/cars/infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    public async findByName(name: string): Promise<Specification> {
        const findedSpecification = this.specifications.find(
            specification => specification.name === name,
        );

        return findedSpecification;
    }

    public async findManyById(ids: string[]): Promise<Specification[]> {
        const specificationsFinded = this.specifications.filter(specification =>
            ids.includes(specification.id),
        );

        return specificationsFinded;
    }

    public async list(): Promise<Specification[]> {
        return this.specifications;
    }

    public async create({
        name,
        description,
    }: ICreateSpecificationsDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
        });

        this.specifications.push(specification);

        return specification;
    }
}

export default SpecificationsRepositoryInMemory;
