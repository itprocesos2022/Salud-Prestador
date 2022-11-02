const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
const { Prestacion } = require("../models/prestacion");
const { Prestador } = require("../models/prestador");
const EquipoSucursal = require("./equipo_sucursal");
const { Integrante } = require("./integrante");

const Equipo = sequelize.define(
  "equipos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comuna: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sucursal: {
      type: DataTypes.STRING,
      allowNull: false,
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
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    id_prestador: {
      type: DataTypes.INTEGER,
    },
    observacion: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "equipos",
  }
);

const EquipoPrestaciones = sequelize.define(
  "equipo_prestaciones",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_prestacion: {
      type: DataTypes.INTEGER,
    },

    id_equipo: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, timestamps: false, tableName: "equipo_prestaciones" }
);

Equipo.belongsTo(Prestador, { foreignKey: "id_prestador" });
Prestador.hasOne(Equipo, { foreignKey: "id_prestador", id: "id" });

Equipo.belongsToMany(Prestacion, {
  through: EquipoPrestaciones,
  unique: false,
  foreignKey: "id_equipo",
});
Prestacion.belongsToMany(Equipo, {
  through: EquipoPrestaciones,
  unique: false,
  foreignKey: "id_prestacion",
});

Equipo.hasMany(Integrante, { foreignKey: "id_equipo" });
Integrante.belongsTo(Equipo, { foreignKey: "id_equipo" });

Equipo.hasMany(EquipoSucursal, { foreignKey: "id_equipo" });
EquipoSucursal.belongsTo(Equipo, { foreignKey: "id_equipo" });

module.exports = { Equipo, EquipoPrestaciones };
