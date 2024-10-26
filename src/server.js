const express = require('express');
const { dbConnection } = require('./db');
const restauranteRouter = require('./router');

const app = express();

dbConnection();

app.use(express.json());

app.use('/restaurantes', restauranteRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});