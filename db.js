const { Sequelize } = require('sequelize');

// sqlite path ./delivery.db
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './delivery.db'
});

// create table restaurantes
async function openConnection() {
    try {
        await sequelize.authenticate();
        sequelize.sync({ force: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    openConnection,
    sequelize
}