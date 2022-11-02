const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

const Programas = sequelize.define(
  "programas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    presupuesto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cupos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prestacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "programas",
  }
);

module.exports = { Programas };
