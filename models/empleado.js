const {DataTypes} = require("sequelize");
const {db1 } = require("../connection/connection");


const Empleado = new db1.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    run:{
        type: DataTypes.STRING,
        allowNull: false
    },
    names:{
        type: DataTypes.STRING,
        allowNull: false
    },
    paternal_surname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    maternal_surname:{
        type: DataTypes.STRING,
        allowNull: true
    },
    born_date:{
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marital_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    scholarship_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    disability: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credential_disability: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    alive: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rsh:{
        type: DataTypes.STRING,
        allowNull: true
    },
    rsh_percentage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    rsh_status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    disability_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    disability_percentage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: true
    },
    etnia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_attention_date:{
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    hast_follow_attentions:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    has_social_case:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    }

},{
    timestamps: false,
    modelName: 'employee'
});

module.exports = {Empleado};