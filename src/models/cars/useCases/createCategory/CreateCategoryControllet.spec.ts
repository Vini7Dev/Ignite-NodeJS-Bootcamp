import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import app from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('CreateCategory Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const password = await hash('admin', 8);
        await connection.query(`
            INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
            VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'AAA-ZZZZ')
        `);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able to create a new category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin',
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Example Name',
                description: 'Example Description',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('id');
    });
});
