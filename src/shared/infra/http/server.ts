import app from './app';

const serverPort = process.env.SERVER_PORT || 3333;

app.listen(serverPort, () => {
    console.log(`===> Server started on port ${serverPort} <===`);
});
