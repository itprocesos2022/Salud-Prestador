const { DataTypes } = require('sequelize');
const {sequelize } = require('../connection/connection');

const Etapa = sequelize.define('etapas', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre_etapa:{
                type: DataTypes.STRING,
                allowNull: false
            },
            orden_etapa: {
                type:DataTypes.INTEGER,
                allowNull: false
            },
            descripcion_etapa: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fecha_creacion: {
                type: 'TIMESTAMP',
                defaultValue: DataTypes.NOW,
                allowNull: true
            },
            fecha_actualizacion: {
                type: 'TIMESTAMP',
                defaultValue: DataTypes.NOW,
                allowNull: true
            }
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'etapas'
        });


module.exports = {Etapa};