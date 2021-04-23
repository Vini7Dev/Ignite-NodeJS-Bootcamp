import ICreateCarImageDTO from '../dtos/ICreateCarImageDTO';
import CarImage from '../infra/typeorm/entities/CarImage';

interface ICarImagesRepository {
    create(data: ICreateCarImageDTO): Promise<CarImage>;
}

export default ICarImagesRepository;
