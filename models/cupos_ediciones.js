const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
// const { Programas } = require("./programas");

const CuposEdiciones = sequelize.define(
  "cupos_ediciones",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    programa_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valorantiguo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "cupos_ediciones",
  }
);

// CuposEdiciones.hasOne(Programas, { foreignKey: "programa_id" });

module.exports = { CuposEdiciones };
