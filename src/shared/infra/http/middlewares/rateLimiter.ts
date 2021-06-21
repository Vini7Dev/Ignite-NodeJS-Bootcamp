import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 10,
    duration: 5,
});

const rateLimiter = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        limiter.consume(request.ip);

        next();
    } catch {
        throw new AppError('too many requests.', 429);
    }
};

export default rateLimiter;
