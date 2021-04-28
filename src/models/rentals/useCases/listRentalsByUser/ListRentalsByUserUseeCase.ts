import Rental from '@models/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@models/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ) {}

    public async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUserId(
            user_id,
        );

        return rentalsByUser;
    }
}

export default ListRentalsByUserUseCase;
