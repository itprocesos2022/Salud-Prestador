const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
const { PrestadorContacto } = require("./prestador_contacto");
const { PrestadorDireccion } = require("./prestador_direccion");
const { PrestadorPrestacion } = require("./preestador_prestacion");
const { SucursalesPrestadores } = require("./sucursales_prestadores");
const { Prestacion } = require("./prestacion");

const Prestador = sequelize.define(
  "prestadores",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prestador_rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_prestador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "prestadores",
  }
);

Prestador.hasOne(PrestadorContacto, { foreignKey: "id_prestador" });
PrestadorContacto.belongsTo(Prestador, { foreignKey: "id_prestador" });
Prestador.hasOne(PrestadorDireccion, { foreignKey: "id_prestador" });
PrestadorDireccion.belongsTo(Prestador, { foreignKey: "id_prestador" });
Prestador.hasOne(SucursalesPrestadores, { foreignKey: "prestador_id" });
SucursalesPrestadores.belongsTo(Prestador, { foreignKey: "prestador_id" });

Prestador.belongsToMany(Prestacion, {
  through: PrestadorPrestacion,
  unique: false,
  foreignKey: "id_prestador",
});
Prestacion.belongsToMany(Prestador, {
  through: PrestadorPrestacion,
  unique: false,
  foreignKey: "id_prestacion",
});

module.exports = { Prestador };
