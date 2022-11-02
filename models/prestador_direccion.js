const { DataTypes } = require('sequelize');
const {sequelize } = require('../connection/connection');


const PrestadorDireccion = sequelize.define('prestadores_direcciones', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_prestador: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_sucursal:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tipo_direccion: {
            type:DataTypes.STRING,
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comuna: {
            type: DataTypes.STRING,
            allowNull: true
        },
        region: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_prestadores: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_prestadores_sucursales:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        timestamps: false,
        sequelize,
        modelName: 'prestadores_direcciones'
    });

module.exports = {PrestadorDireccion};