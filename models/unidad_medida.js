const {sequelize } = require('../connection/connection');
const { DataTypes } = require('sequelize');


const UnidadMedida = sequelize.define('UnidadMedida', {
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
    tableName: 'unidad_medidas',
    modelName: 'UnidadMedida'
});

module.exports = {UnidadMedida};