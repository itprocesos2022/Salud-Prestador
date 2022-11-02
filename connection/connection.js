const { Sequelize } = require('sequelize');
require("dotenv").config();

const {
  USERDB, HOST, DB, PASSWORD, DBPORT,
  USERDB1, PASSWORD1, HOST1, DB1,
  USERDB3, PASSWORD3, HOST3, DB3,
  DB1_USER
} = process.env;

const sequelize = new Sequelize(`postgres://${USERDB}:${encodeURIComponent(
    PASSWORD
  )}@${HOST}:${DBPORT}/${DB}`);

const db1 = new Sequelize(`postgres://${USERDB1}:${encodeURIComponent(
    PASSWORD1
)}@${HOST1}:${DBPORT}/${DB1}`);

const dbUser = new Sequelize(`postgres://${USERDB1}:${encodeURIComponent(
    PASSWORD1
)}@${HOST1}:${DBPORT}/${DB1_USER}`);

const db3 = new Sequelize(`postgres://${USERDB3}:${encodeURIComponent(
    PASSWORD3
)}@${HOST3}:${DBPORT}/${DB3}`, { dialect: 'postgres', dialectOptions: { ssl: true }});

module.exports = {sequelize, db1, db3, dbUser};


