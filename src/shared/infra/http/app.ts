import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import AppError from '@shared/errors/AppError';
import upload from '@config/upload';
import createConnection from '../typeorm';
import '../../container';

import mainRoutes from './routes';
import swaggerFile from '../../../swagger.json';

createConnection();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tempFolder}/avatar`));
app.use('/car', express.static(`${upload.tempFolder}/car`));

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

export default app;
