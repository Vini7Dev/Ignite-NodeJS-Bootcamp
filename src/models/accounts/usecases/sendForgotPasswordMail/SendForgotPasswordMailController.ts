import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordMailUseCase = container.resolve(
            SendForgotPasswordMailUseCase,
        );

        const forgotPasswordMailReponse = await sendForgotPasswordMailUseCase.execute(
            email,
        );

        return response.status(200).json(forgotPasswordMailReponse);
    }
}

export default SendForgotPasswordMailController;
