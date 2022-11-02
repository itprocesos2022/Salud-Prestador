const express = require("express");
const PrestacionesController = require("../controller/prestaciones");

const api = express.Router();
const prefix = "prestaciones";

api.get(`/${prefix}`, PrestacionesController.getAll);
api.get(`/${prefix}/:id`, PrestacionesController.getOnePrestacion);
api.put(`/${prefix}/:id`, PrestacionesController.editOne);
api.post(`/${prefix}/new-prestacion`, PrestacionesController.createOne);
api.put(
  `/${prefix}/delete-prestacion/:id`,
  PrestacionesController.deletePrestacion
);
api.put(
  `/${prefix}/activate-prestacion/:id`,
  PrestacionesController.activatePrestacion
);
api.get(`/${prefix}/get-etapas/:id`, PrestacionesController.getEtapas);
api.post(`/${prefix}/create-etapa`, PrestacionesController.createEtapa);
api.post(`/${prefix}/asociate-etapa/:id`, PrestacionesController.asociateEtapa);
api.post(`/${prefix}/update-etapa/:id`, PrestacionesController.updateEtapa);
api.post(
  `/${prefix}/delete-etapa/:id`,
  PrestacionesController.deleteAsociation
);
api.get(
  `/${prefix}/beneficiary/type`,
  PrestacionesController.getAllBeneficiaryType
);
api.post(
  `/${prefix}/beneficiary/type/:id`,
  PrestacionesController.asociateTypeAndPrestacion
);
api.get(`/${prefix}/beneficiary/type/:id`, PrestacionesController.getTypes);
api.post(
  `/${prefix}/delete/beneficiary/type/:id`,
  PrestacionesController.deleteTypeAsociation
);
api.get(`/${prefix}/sucursal/:id`, PrestacionesController.getPrestacionesToSucursal);
api.post(`/${prefix}/sucursal/:id`, PrestacionesController.addSucursalToPrestacion);


module.exports = api;
