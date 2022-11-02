const { sequelize } = require("../connection/connection");
const { DataTypes } = require("sequelize");
const { Medida } = require("../models/medida");
const { Etapa } = require("../models/etapa");

const Etapa_Medida = sequelize.define(
  "etapas_medidas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_etapa: {
      type: DataTypes.INTEGER,
    },
    id_medida: {
      type: DataTypes.INTEGER,
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
  },
  {
    timestamps: false,
    sequelize,
    modelName: "etapas",
  }
);

Etapa_Medida.belongsTo(Etapa, { foreignKey: "id_etapa" });
Etapa.hasOne(Etapa_Medida, { foreignKey: "id_etapa", id: "id" });

Etapa_Medida.belongsTo(Medida, { foreignKey: "id_medida" });
Medida.hasOne(Etapa_Medida, { foreignKey: "id_medida", id: "id" });

module.exports = { Etapa_Medida };
