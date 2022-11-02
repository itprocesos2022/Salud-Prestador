const { DataTypes } = require('sequelize');
const {sequelize } = require('../connection/connection');
const {Prestacion} = require('../models/prestacion');


const Integrante = sequelize.define('integrantes', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            rut:{
                type: DataTypes.STRING,
                allowNull: false
            },
            nombres: {
                type:DataTypes.STRING,
                allowNull: false
            },
            apellidos: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_equipo: {
                type: DataTypes.INTEGER,
                allowNull: true
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
            modelName: 'integrantes'
        });

        
        const IntegrantesPrestaciones = sequelize.define('integrantes_prestaciones', {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },

            id_integrante: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            id_prestacion: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
            
          }, { timestamps: false, sequelize, modelName: 'integrantes_prestaciones' });


          Integrante.belongsToMany(Prestacion, { through: IntegrantesPrestaciones, unique: false, foreignKey: 'id_integrante'});
          Prestacion.belongsToMany(Integrante, { through: IntegrantesPrestaciones,  unique: false, foreignKey: 'id_prestacion'});



          module.exports = {IntegrantesPrestaciones, Integrante};