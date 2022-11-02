const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const SucursalesPrestadores = sequelize.define(
  "sucursales_prestadores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    direccion_sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region_sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comuna_sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono_sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_sucursal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado_sucursal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    prestador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre_prestador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_sucursal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "sucursales_prestadores",
    tableName: 'sucursales_prestadores'
  }
);

module.exports = { SucursalesPrestadores };
