const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
const { Prestacion } = require("../models/prestacion");
const { Prestador } = require("../models/prestador");
const { Equipo } = require("../models/equipo");
const { EstadoOperativoTerreno } = require("./estado_operativos_terrenos");

const OperativoTerreno = sequelize.define(
  "operativo_terreno",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empresa_id: {
      type: DataTypes.INTEGER,
    },
    obra_id: {
      type: DataTypes.INTEGER,
    },
    fecha: {
      type: "TIMESTAMP",
      defaultValue: DataTypes.NOW,
    },
    prestacion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prestador_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    precio: {
      type: DataTypes.FLOAT,
    },
    asistente_social_id: {
      type: DataTypes.INTEGER,
    },
    gestor_id: {
      type: DataTypes.INTEGER,
    },
    asistente_operaciones_id: {
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
    status: {
      type: DataTypes.INTEGER,
    },
    company_name: {
      type: DataTypes.STRING,
    },
    construction_name: {
      type: DataTypes.STRING,
    },
    prestacion_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prestador_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prestador_rut: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    team_sucursal_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    asistente_social_names: {
      type: DataTypes.STRING,
    },
    gestor_nombres: {
      type: DataTypes.STRING,
    },
    asistente_operaciones_nombres: {
      type: DataTypes.STRING,
    },
    construction_address: {
      type: DataTypes.STRING,
    },
    programa_id: {
      type: DataTypes.INTEGER,
    },
    programa_name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "operativo_terreno",
  }
);

OperativoTerreno.belongsTo(Prestacion, { foreignKey: "prestacion_id" });
Prestacion.hasOne(OperativoTerreno, { foreignKey: "prestacion_id", id: "id" });

OperativoTerreno.belongsTo(Prestador, { foreignKey: "prestador_id" });
Prestador.hasOne(OperativoTerreno, { foreignKey: "prestador_id", id: "id" });

OperativoTerreno.belongsTo(Equipo, { foreignKey: "equipo_id" });
Equipo.hasOne(OperativoTerreno, { foreignKey: "equipo_id", id: "id" });

OperativoTerreno.belongsTo(EstadoOperativoTerreno, { foreignKey: "status" });
EstadoOperativoTerreno.hasOne(OperativoTerreno, {
  foreignKey: "status",
  id: "id",
});

module.exports = { OperativoTerreno };
