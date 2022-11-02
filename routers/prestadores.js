const express = require("express");
const PrestadoresController = require("../controller/prestadores");
const {validateTeamDelete} = require("../helpers/validation");


const api = express.Router();
const prefix = "prestadores";

api.get(`/${prefix}`, PrestadoresController.getAll);
api.post(`/${prefix}/create-prestador`, PrestadoresController.createPrestador);
api.get(`/${prefix}/:id`, PrestadoresController.getOnePrestador);
api.post(`/${prefix}/add-prestaciones/:id`, PrestadoresController.addPrestacionToPrestador);
api.put(`/${prefix}/:id`, PrestadoresController.updateOnePrestador);
api.put(`/${prefix}/eliminar/:id`,PrestadoresController.deletePrestador);
api.get(`/${prefix}/prestaciones/:id`, PrestadoresController.listPrestacionesOfOnePrestador);
api.get(`/${prefix}/get-prestaciones/:id`, PrestadoresController.listPrestacionesNotLoadedOfOnePrestador);
api.get(`/${prefix}/remove-prestaciones/:id`, PrestadoresController.removeOnePrestacionToPrestador);

module.exports = api;
