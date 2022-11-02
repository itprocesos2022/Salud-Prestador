const express = require("express");
const ProgramasController = require("../controller/programas");

const api = express.Router();
const prefix = "programas";

api.get(`/${prefix}`, ProgramasController.getAll);
api.post(`/${prefix}/create-programa`, ProgramasController.createPrograma);
api.get(`/${prefix}/:id`, ProgramasController.getOnePrograma);
// api.post(`/${prefix}/add-prestaciones/:id`, PrestadoresController.addPrestacionToPrestador);
api.put(`/${prefix}/:id`, ProgramasController.updateOnePrograma);
api.delete(`/${prefix}/:id`, ProgramasController.deleteOnePrograma);
// api.put(`/${prefix}/eliminar/:id`,PrestadoresController.deletePrestador);
// api.get(`/${prefix}/prestaciones/:id`, PrestadoresController.listPrestacionesOfOnePrestador);
// api.get(`/${prefix}/get-prestaciones/:id`, PrestadoresController.listPrestacionesNotLoadedOfOnePrestador);
// api.get(`/${prefix}/remove-prestaciones/:id`, PrestadoresController.removeOnePrestacionToPrestador);

module.exports = api;
