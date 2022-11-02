const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());

const API_VERSION = process.env.API_VERSION;
const urlBase = `/api/${API_VERSION}`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Load Routings
const prestadoresRoutes = require("./routers/prestadores");
const prestacionesRoutes = require("./routers/prestaciones");
const equiposRoutes = require("./routers/equipos");
const operativosTerrenos = require("./routers/operativo_terreno");
const operativosDerivacion = require("./routers/operativo_derivacion");
const sucursalPrestador = require("./routers/sucursal_prestador");
const trabadoresRoutes = require("./routers/trabajadores");
const medidasRoutes = require("./routers/medidas");
const programasRoutes = require("./routers/programas");
const yearsRoutes = require("./routers/years");

// Configure Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Basic Routes
app.use(urlBase, prestadoresRoutes);
app.use(urlBase, prestacionesRoutes);
app.use(urlBase, equiposRoutes);
app.use(urlBase, operativosTerrenos);
app.use(urlBase, operativosDerivacion);
app.use(urlBase, sucursalPrestador);
app.use(urlBase, trabadoresRoutes);
app.use(urlBase, medidasRoutes);
app.use(urlBase, programasRoutes);
app.use(urlBase, yearsRoutes);

module.exports = app;
