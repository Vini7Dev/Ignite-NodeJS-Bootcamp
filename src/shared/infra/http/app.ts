import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import swaggerUi from 'swagger-ui-express';
import AppError from '@shared/errors/AppError';
import upload from '@config/upload';
import createConnection from '../typeorm';
import '../../container';

import mainRoutes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import swaggerFile from '../../../swagger.json';

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tempFolder}/avatar`));
app.use('/car', express.static(`${upload.tempFolder}/car`));

app.use(mainRoutes);

app.use(Sentry.Handlers.errorHandler());

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
