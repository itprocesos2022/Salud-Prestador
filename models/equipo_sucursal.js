const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection/connection');

const EquipoSucursal = sequelize.define("equipo_sucursal", {

    id_equipo: {
        type: DataTypes.INTEGER
    },
    id_sucursal: {
        type: DataTypes.INTEGER
    }

},{ timestamps: false,  sequelize, tableName: 'equipos_sucursales' });


module.exports = EquipoSucursal;