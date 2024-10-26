const { sequelize } = require('./db-connection');
const { DataTypes } = require('sequelize');

const Restaurantes = sequelize.define('restaurantes', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avaliacao: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Restaurantes;