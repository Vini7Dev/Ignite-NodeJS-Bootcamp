import request from 'supertest';
import app from '@shared/infra/http/app';

describe('CreateCategory Controller', () => {
    it('should be able to create a new category', async () => {
        const response = await request(app).post('/categories').send({
            name: 'Example Name',
            description: 'Example Description',
        });

        expect(response.status).toEqual(201);
    });
});
