const { sequelize } = require("../connection/connection");
const { DataTypes } = require("sequelize");
const { TipoMedida } = require("../models/tipo_medida");
const { TipoDato } = require("../models/tipo_dato");
const { UnidadMedida } = require("../models/unidad_medida");
const Medida = sequelize.define(
  "medidas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_tipo_medida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_tipo_dato: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor_minimo: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    valor_maximo: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nombre_tipo_medida: {
      type: DataTypes.STRING,
    },
    nombre_tipo_dato: {
      type: DataTypes.STRING,
    },
    nombre_unidad_medida: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "medidas",
  }
);
Medida.belongsTo(TipoMedida, { foreignKey: "id_tipo_medida" });
TipoMedida.hasOne(Medida, { foreignKey: "id_tipo_medida", id: "id" });
Medida.belongsTo(TipoDato, { foreignKey: "id_tipo_dato" });
TipoDato.hasOne(Medida, { foreignKey: "id_tipo_dato", id: "id" });
Medida.belongsTo(UnidadMedida, { foreignKey: "id_unidad_medida" });
UnidadMedida.hasOne(Medida, { foreignKey: "id_unidad_medida", id: "id" });
module.exports = { Medida };
