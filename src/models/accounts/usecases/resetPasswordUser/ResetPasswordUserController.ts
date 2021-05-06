import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPaswordUserUseCase from './ResetPasswordUserUseCase';

class ResetPaswordUserController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordUserUseCase = container.resolve(
            ResetPaswordUserUseCase,
        );

        await resetPasswordUserUseCase.execute({
            token: token.toString(),
            password,
        });

        return response.status(200).json({ message: 'password updated.' });
    }
}

export default ResetPaswordUserController;
