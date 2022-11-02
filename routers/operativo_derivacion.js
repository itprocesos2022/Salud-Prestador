const express = require("express");
const OperativoDerivacionController = require("../controller/operativo_derivacion");

const api = express.Router();
const prefix = "operativo-derivacion";

api.get(`/${prefix}`, OperativoDerivacionController.getAll);
api.post(`/${prefix}/`, OperativoDerivacionController.createOneDerivacion);
api.get(`/${prefix}/:id`, OperativoDerivacionController.getOneDerivacion);
api.put(`/${prefix}/:id`, OperativoDerivacionController.editOneDerivacion);
api.get(`/${prefix}/cancel/:id`, OperativoDerivacionController.cancelOneDerivacion);


module.exports = api;