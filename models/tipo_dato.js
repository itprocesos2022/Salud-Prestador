const {sequelize } = require('../connection/connection');
const { DataTypes } = require('sequelize');


const TipoDato = sequelize.define('TipoDato', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    tableName: 'tipo_datos',
    modelName: 'TipoDato'
});

module.exports = {TipoDato};