import ICreateCarImageDTO from '@models/cars/dtos/ICreateCarImageDTO';
import ICarImagesRepository from '@models/cars/repositories/ICarImagesRepository';
import { getRepository, Repository } from 'typeorm';
import CarImage from '../entities/CarImage';

class CarImagesRepository implements ICarImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    public async create({
        car_id,
        image_name,
    }: ICreateCarImageDTO): Promise<CarImage> {
        const createdCarImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(createdCarImage);

        return createdCarImage;
    }
}

export default CarImagesRepository;
