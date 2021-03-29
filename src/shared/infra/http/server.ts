import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import '../typeorm';
import '../../container';

import AppError from '@shared/errors/AppError';
import mainRoutes from './routes';
import swaggerFile from '../../../swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(mainRoutes);

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ): Response => {
        if (error instanceof AppError) {
            return response
                .status(error.statusCode)
                .json({ error: error.message });
        }

        return response
            .status(500)
            .json({ error: `internal server error - ${error.message}` });
    },
);

app.listen(3333, () => {
    console.log('===> Server started on port 3333 <===');
});
