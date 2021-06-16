import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id: user_id } = request.user;

        const avatar_file = request.file.filename;

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase,
        );

        const user = await updateUserAvatarUseCase.execute({
            user_id,
            avatar_file,
        });

        return response.status(200).json(user);
    }
}

export default UpdateUserAvatarController;
