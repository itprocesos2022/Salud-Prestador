const {sequelize } = require('../connection/connection');
const { DataTypes } = require('sequelize');


const TipoMedida = sequelize.define('TipoMedida', {
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
    tableName: 'tipo_medidas',
    modelName: 'TipoMedida'
});

module.exports = {TipoMedida};