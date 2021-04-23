import ICarImagesRepository from '@models/cars/repositories/ICarImagesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject('CarImagesRepository')
        private carImagesRepository: ICarImagesRepository,
    ) {}

    public async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.forEach(async image_name => {
            await this.carImagesRepository.create({
                car_id,
                image_name,
            });
        });
    }
}

export default UploadCarImagesUseCase;