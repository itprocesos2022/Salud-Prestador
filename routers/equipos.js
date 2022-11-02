const express = require("express");
const EquiposController = require("../controller/equipos");
const {
  validateTeamCreate,
  validateGetTeams,
  validateTeamEdit,
  validateTeamDelete,
  validateAddPersonalFromTeams,
  validateDeletePersonalWithTeam,
  validateEditPersonalFromTeams
} = require("../helpers/validation");

const api = express.Router();
const prefix = "equipos";

api.get(`/${prefix}`, validateGetTeams, EquiposController.getAll);
api.post(`/${prefix}/`, validateTeamCreate, EquiposController.createOneTeam);
api.get(`/${prefix}/:id`, EquiposController.getOneTeam);
api.put(`/${prefix}/:id`, validateTeamEdit, EquiposController.editOneTeam);
api.post(`/${prefix}/integrantes/:id`, validateAddPersonalFromTeams, EquiposController.addPersonalFromTeam);
api.put(`/${prefix}/:id/integrante/:integranteid`, validateEditPersonalFromTeams, EquiposController.updatePersonalFromTeam);
api.put(`/${prefix}/eliminar/integrantes/:id`, validateDeletePersonalWithTeam, EquiposController.deletePersonalFromTeam);
api.put(`/${prefix}/eliminar/:id`,validateTeamDelete,EquiposController.deleteTeam);
api.get(`/${prefix}/sucursal/:id`, EquiposController.getTeamsToSucursal);
api.post(`/${prefix}/sucursal/:id`, EquiposController.addSucursalToTeam);

module.exports = api;
