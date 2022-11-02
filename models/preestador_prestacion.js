const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const PrestadorPrestacion = sequelize.define(
  "prestadores_prestaciones",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estado_relacion: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 1,
    },
    id_prestador: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_prestacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_creacion: {
      type: "TIMESTAMP",
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    fecha_actualizacion: {
      type: "TIMESTAMP",
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    metropolitana: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: 0,
    },
    region: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: 0,
    },
    regionExtrema: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "prestadores_prestaciones",
    tableName: "prestadores_prestaciones",
  }
);

module.exports = { PrestadorPrestacion };
