import ICreateCarDTO from '../dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

interface ICarsRepository {
    findById(id: string): Promise<Car>;
    findByLicensePlate(license_platelicense_plate: string): Promise<Car>;
    findAvailable(
        name?: string,
        category_id?: string,
        brand?: string,
    ): Promise<Car[]>;
    create(data: ICreateCarDTO): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export default ICarsRepository;
