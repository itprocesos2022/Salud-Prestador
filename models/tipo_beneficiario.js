const { DataTypes } = require('sequelize');
const {sequelize } = require('../connection/connection');



const TipoBeneficiario = sequelize.define('tipo_beneficiarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_beneficiario: {
        type: DataTypes.STRING,
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
    },
}, {
    timestamps: false,
    sequelize,
    modelName: 'tipo_beneficiarios',
    tableName: 'tipo_beneficiarios'
});






module.exports = {TipoBeneficiario};