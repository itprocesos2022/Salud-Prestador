const express = require("express");
const MedidasController = require("../controller/medidas");
const api = express.Router();
const prefix = "medidas";
api.get(`/${prefix}/tipos-medidas`, MedidasController.getAllTypeMeasure);
api.get(`/${prefix}/tipo-datos`, MedidasController.getAllTypeData);
api.get(`/${prefix}/unidad-medidas`, MedidasController.getAllUnityMeasure);
api.get(`/${prefix}`, MedidasController.getAll);
api.post(`/${prefix}`, MedidasController.createOneMeasures);
api.get(`/${prefix}/:id`, MedidasController.showOneMeasures);
api.post(`/${prefix}/:id/actualizar`, MedidasController.editOneMeasures);
api.delete(`/${prefix}/:id`, MedidasController.deleteMeasure);
api.post(`/${prefix}/asociation`, MedidasController.asociateMedidaEtapa);
api.get(
  `/${prefix}/asociation/:id_etapa`,
  MedidasController.getAsociationsByEtapa
);

module.exports = api;
