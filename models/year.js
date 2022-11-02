const { sequelize } = require("../connection/connection");
const { DataTypes } = require("sequelize");
const Year = sequelize.define(
  "years",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    desde: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "years",
  }
);

module.exports = { Year };
