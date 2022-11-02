const express = require("express");
const OperativoTerrenoController = require("../controller/operativo_terreno");
const uploadFile = require("../middleware/upload_file");

const api = express.Router();
const prefix = "operativo-terreno";

api.get(`/${prefix}`, OperativoTerrenoController.getAll);
api.post(`/${prefix}/`, OperativoTerrenoController.createOneTerreno);
api.get(`/${prefix}/visits`, OperativoTerrenoController.getAllVisits);
api.get(`/${prefix}/generate-pdf`, OperativoTerrenoController.generatePDFDocument);
api.get(`/${prefix}/download-pdf/:id`, OperativoTerrenoController.downloadPDFDocument);
api.get(`/${prefix}/:id`, OperativoTerrenoController.getOneTerreno);
api.put(`/${prefix}/:id`, OperativoTerrenoController.editOneTerreno);
api.put(`/${prefix}/cancel/:id`, OperativoTerrenoController.cancelOneTerreno);
api.post(`/${prefix}/prestacion/add-etapa/:id`, OperativoTerrenoController.addEtapaToPrestacion);
api.get(`/${prefix}/prestacion/generate-excel/:id`, OperativoTerrenoController.buildExcelTemplate);
api.post(`/${prefix}/prestacion/import-excel/`, uploadFile.single("file"), OperativoTerrenoController.importDocumentExcel);


module.exports = api;
