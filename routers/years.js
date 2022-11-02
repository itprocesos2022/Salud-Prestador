const express = require("express");
const YearsControllers = require("../controller/years");
const api = express.Router();
const prefix = "years";

api.get(`/${prefix}`, YearsControllers.getAll);
api.post(`/${prefix}`, YearsControllers.createOneYear);
api.put(`/${prefix}/:id`, YearsControllers.editOneYears);
api.delete(`/${prefix}/:id`, YearsControllers.deleteYear);

module.exports = api;
