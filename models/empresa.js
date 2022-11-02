const {db3} = require("../connection/connection");
const {DataTypes} = require("sequelize");


const Empresa = db3.define('business',{

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rut:{
        type: DataTypes.STRING,
        allowNull:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:true
    },
    address: {
        type: DataTypes.STRING,
        allowNull:false
    },
    business_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:true
    },
    is_partner: {
        type: DataTypes.STRING,
        allowNull:false
    },
    state: {
        type: DataTypes.ENUM('CREATED', 'DELETED'),
        allowNull:false
    },
    benefit_pyme: {
        type: DataTypes.STRING,
        allowNull:true
    },
    social_service: {
        type: DataTypes.STRING,
        allowNull:false
    },
    type: {
        type: DataTypes.STRING,
        allowNull:false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull:true
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull:true
    },
    region_id: {
        type: DataTypes.INTEGER
    },
    commune_id: {
        type: DataTypes.INTEGER
    },
    parent_business_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    update_at: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    comments: {
        type: DataTypes.STRING,
        allowNull:true
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    is_billing_business:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    }

},
    {
        timestamps: false,
        db3,
        modelName: 'business',
        tableName: 'business'
    });

module.exports = {Empresa};