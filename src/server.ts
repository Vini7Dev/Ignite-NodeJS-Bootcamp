import express from 'express';
import mainRoutes from './routes';

const app = express();

app.use(express.json());

app.use(mainRoutes);

app.listen(3333, () => {
    console.log('===> Server started on port 3333 <===');
});
