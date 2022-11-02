const {dbUser} = require("../connection/connection");
const {DataTypes} = require("sequelize");


const User = dbUser.define('user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        names: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        paternal_surname: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        maternal_surname: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        is_administrator: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
        account_status: {
            type: DataTypes.STRING(20),
            allowNull: false
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
        charge_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        charge_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        jefatura_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        boss_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_old: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        region: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        ciudad: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        delegacion: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        region_delegacion: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        comuna_delegacion: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        departamento: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        area: {
            type: DataTypes.STRING(120),
            allowNull: true,
        }



    },
    {
        timestamps: false,
        tableName: 'user',
        dbUser,
        modelName: 'user'
    });




module.exports = { User };