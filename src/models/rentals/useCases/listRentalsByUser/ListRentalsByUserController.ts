import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListRentalsByUserUseCase from './ListRentalsByUserUseeCase';

class ListRentalsByUserController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id: user_id } = request.user;

        const listRentalsByUserUseCase = container.resolve(
            ListRentalsByUserUseCase,
        );

        const rental = await listRentalsByUserUseCase.execute(user_id);

        return response.status(200).json(rental);
    }
}

export default ListRentalsByUserController;
