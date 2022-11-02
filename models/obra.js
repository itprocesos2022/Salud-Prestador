const {db3} = require("../connection/connection");
const {DataTypes} = require("sequelize");


const Obra = db3.define('obra', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM('VIGENTE', 'NO_VIGENTE'),
        allowNull: false
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type:DataTypes.STRING,
        allowNull: true
    },
    longitude:{
        type:DataTypes.STRING,
        allowNull: true
    },
    typology_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    economic_sector_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    end_date: {
        type: 'TIMESTAMP',
        allowNull: true
    },
    region_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commune_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    business_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    billing_business_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    update_at:{
        type: 'TIMESTAMP',
        allowNull: true
    },
    is_suspended: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }

},{
    timestamps: false,
    db3,
    modelName: 'obra',
    tableName: 'construction'
});

module.exports = { Obra };