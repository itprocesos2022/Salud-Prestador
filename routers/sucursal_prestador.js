const express = require("express");
const SucursalPrestadorController = require("../controller/sucursales_prestador");

const api = express.Router();
const prefix = "sucursales";

api.get(`/${prefix}`, SucursalPrestadorController.getAll);
api.get(`/${prefix}/one/:id`, SucursalPrestadorController.getOneSucursal);
api.get(
  `/${prefix}/lookBy`,
  SucursalPrestadorController.getAllSucursalByRegion
);
api.get(
  `/${prefix}/prestador`,
  SucursalPrestadorController.getAllSucursalByPrestador
);
api.post(`/${prefix}`, SucursalPrestadorController.createSucursal);
api.put(`/${prefix}/edit/:id`, SucursalPrestadorController.editSucursal);
api.delete(`/${prefix}/delete/:id`, SucursalPrestadorController.deleteSucursal);

module.exports = api;
