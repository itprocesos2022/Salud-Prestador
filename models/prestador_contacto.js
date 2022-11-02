const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection/connection');


const PrestadorContacto = sequelize.define('prestadores_contactos', {
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
        nombre_contacto: {
            type:DataTypes.STRING,
            allowNull: true
        },
        email_contacto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telefono_1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telefono_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_prestadores: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        timestamps: false,
        sequelize,
        modelName: 'prestadores_contactos'
    });

module.exports = {PrestadorContacto};