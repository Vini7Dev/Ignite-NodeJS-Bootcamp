import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';
import app from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('ListCategories Controller', () => {
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

    it('shoud be able to list all categories', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin',
        });

        const { token } = responseToken.body;

        await request(app)
            .post('/categories')
            .send({
                name: 'Example Name',
                description: 'Example Description',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const responseListCategories = await request(app).get('/categories');

        expect(responseListCategories.status).toEqual(200);
        expect(responseListCategories.body.length).toEqual(1);
        expect(responseListCategories.body[0]).toHaveProperty('id');
    });
});
