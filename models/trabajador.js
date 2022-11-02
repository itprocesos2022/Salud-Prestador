const {sequelize} = require("../connection/connection");
const {DataTypes} = require("sequelize");


const Trabajador = sequelize.define('trabajador',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombres_trabajador: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apellidos_trabajador: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rut_trabajador: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha_nacimiento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nombre_empresa:{
        type: DataTypes.STRING,
        allowNull: true
    },
    empresa_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rut_empresa:{
        type: DataTypes.STRING,
        allowNull: true
    },
    nombre_obra: {
        type: DataTypes.STRING,
        allowNull: true
    },
    obra_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fecha_atencion: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
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
    },{
    timestamps: false,
    sequelize,
    modelName: 'trabajador',
    tableName: 'trabajadores'
    }
);


module.exports = { Trabajador };