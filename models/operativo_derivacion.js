const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection/connection');
const { Prestacion } = require('./prestacion');


const OperativoDerivacion = sequelize.define('operativo_derivacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    empresa_id: {
        type: DataTypes.INTEGER
    },
    obra_id: {
        type: DataTypes.INTEGER
    },

    trabajador_id:{
        type: DataTypes.INTEGER
    },
    fecha_solicitud: {
        type: DataTypes.STRING
    },
    asistente_social_id: {
        type: DataTypes.INTEGER
    },
    gestor_id: {
        type: DataTypes.INTEGER
    },
    asistente_operaciones_id: {
        type: DataTypes.INTEGER
    },
    prestacion_id: {
        type: DataTypes.INTEGER
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
    },
    status: {
        type: DataTypes.BOOLEAN
    }
},
{
    timestamps: false,
    sequelize,
    modelName: 'operativo_derivacions',
    tableName: 'operativo_derivacions'
});

        OperativoDerivacion.belongsTo(Prestacion, {foreignKey: 'prestacion_id'});
        Prestacion.hasOne(OperativoDerivacion, {foreignKey: 'prestacion_id', id: 'id'});


module.exports = {OperativoDerivacion};