import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProfileUserUseCase from './ProfileUserUseCase';

class ProfileUserController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const profileUserUseCase = container.resolve(ProfileUserUseCase);

        const { id } = request.user;

        const profileLink = await profileUserUseCase.execute(id);

        return response.status(200).json(profileLink);
    }
}

export default ProfileUserController;
