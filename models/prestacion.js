const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
const { Etapa } = require("./etapa");
const { TipoBeneficiario } = require("./tipo_beneficiario");
const { PrestacionSucursal } = require("./prestacion_sucursal");

const Prestacion = sequelize.define(
  "prestaciones",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_prestacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tope_prestacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion_prestacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
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
    estado_prestacion: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "prestaciones",
  }
);

const PrestacionesEtapas = sequelize.define(
  "prestaciones_etapas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_etapas: {
      type: DataTypes.INTEGER,
    },

    id_prestaciones: {
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
  { timestamps: false, sequelize, modelName: "prestaciones_etapas" }
);

const PrestacionesBeneficiarios = sequelize.define(
  "prestaciones_beneficiario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_prestacion: {
      type: DataTypes.INTEGER,
    },

    id_beneficiario: {
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
    modelName: "prestaciones_beneficiario",
    tableName: "prestaciones_beneficiarios",
  }
);

Prestacion.belongsToMany(Etapa, {
  through: PrestacionesEtapas,
  unique: false,
  foreignKey: "id_prestaciones",
});
Etapa.belongsToMany(Prestacion, {
  through: PrestacionesEtapas,
  unique: false,
  foreignKey: "id_etapas",
});
Prestacion.belongsToMany(TipoBeneficiario, {
  through: PrestacionesBeneficiarios,
  unique: false,
  foreignKey: "id_prestacion",
});
TipoBeneficiario.belongsToMany(Prestacion, {
  through: PrestacionesBeneficiarios,
  unique: false,
  foreignKey: "id_beneficiario",
});
Prestacion.hasMany(PrestacionSucursal, { foreignKey: "id_prestacion" });
PrestacionSucursal.belongsTo(Prestacion, { foreignKey: "id" });

module.exports = { Prestacion, PrestacionesEtapas, PrestacionesBeneficiarios };
