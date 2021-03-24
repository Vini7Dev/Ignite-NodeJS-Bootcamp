import { getRepository, Repository } from 'typeorm';
import ICreateSpecificationsDTO from '../../dtos/ICreateSpecificationsDTO';
import Specification from '../../entities/Specification';
import ISpecificationsRepository from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    public async findByName(name: string): Promise<Specification> {
        const findedSpecification = await this.repository.findOne({ name });

        return findedSpecification;
    }

    public async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();

        return specifications;
    }

    public async create({
        name,
        description,
    }: ICreateSpecificationsDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);

        return specification;
    }
}

export default SpecificationsRepository;
