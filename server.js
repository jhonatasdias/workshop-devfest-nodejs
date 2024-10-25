const express = require('express');
const { dbConnection } = require('./db-connection');
const restauranteRouter = require('./router');

const app = express();

app.use(express.json());

dbConnection();

app.use('/restaurantes', restauranteRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});