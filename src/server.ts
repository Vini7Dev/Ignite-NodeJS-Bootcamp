import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mainRoutes from './routes';
import swaggerFile from './swagger.json';
import './database';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(mainRoutes);

app.listen(3333, () => {
    console.log('===> Server started on port 3333 <===');
});
