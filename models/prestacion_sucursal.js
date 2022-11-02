const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection/connection');


const PrestacionSucursal = sequelize.define("prestacion_sucursal", {

    id_prestacion: {
        type: DataTypes.INTEGER
    },
    id_sucursal: {
        type: DataTypes.INTEGER
    }

},{ timestamps: false,  sequelize, tableName: 'prestaciones_sucursales' });



module.exports = { PrestacionSucursal };