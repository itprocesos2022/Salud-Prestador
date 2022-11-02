const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
const { OperativoTerreno } = require("./operativo_terreno");

const EstadoOperativoTerreno = sequelize.define(
  "estado_operativos_terrenos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "estado_operativos_terrenos",
  }
);

module.exports = { EstadoOperativoTerreno };
