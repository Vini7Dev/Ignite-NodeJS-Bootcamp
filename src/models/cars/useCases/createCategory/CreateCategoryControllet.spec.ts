import request from 'supertest';
import app from '@shared/infra/http/app';

describe('CreateCategory Controller', () => {
    it('TEST', async () => {
        await request(app).get('/carts/available').expect(200);
    });
});
