const express = require("express");
const TrabajadoresController = require("../controller/trabajadores");

const api = express.Router();
const prefix = "trabajadores";


api.get(`/${prefix}`, TrabajadoresController.getAll);
api.post(`/${prefix}/`, TrabajadoresController.createOneTrabajador);

module.exports = api;