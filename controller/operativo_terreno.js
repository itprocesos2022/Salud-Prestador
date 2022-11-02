const { Equipo } = require("../models/equipo");
const { OperativoTerreno } = require("../models/operativo_terreno");
const { Prestacion, PrestacionesEtapas } = require("../models/prestacion");
const { Prestador } = require("../models/prestador");
const { generateTemplateExcel } = require("../helpers/generate_template_excel");

const {
  EstadoOperativoTerreno,
} = require("../models/estado_operativos_terrenos");
const { generatePdf, dowloadFilePDF } = require("../helpers/generate_pdf");
const { Empresa } = require("../models/empresa");
const { Obra } = require("../models/obra");
const { Integrante } = require("../models/integrante");
const { User } = require("../models/usuario");
const readXlsxFile = require("read-excel-file/node");
const { Trabajador } = require("../models/trabajador");
const { v4: uuidv4 } = require("uuid");

const getAll = async (req, res) => {
  try {
    const { limit, page, search, state } = req.query;

    console.log(search, state);

    const operativosTerrenos = await OperativoTerreno.findAndCountAll({
      limit: limit ? limit : 10,
      offset: page ? (page - 1) * limit : 0,
      include: [Prestador, Prestacion, Equipo, EstadoOperativoTerreno],
      order: [["fecha_creacion", "DESC"]],
    });

    if (operativosTerrenos.count < 1) {
      res.status(200).send({
        message: "No se encontraron operativos terrenos.",
        operativosTerrenos: [],
      });
    } else {
      res.status(200).send({ operativosTerrenos: operativosTerrenos });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error módulo operativos terrenos.",
      message: ex.message,
    });
  }
};

const getAllVisits = async (req, res) => {
  try {
    const { limit, page, search, state, id } = req.query;

    const operativosTerrenos = await OperativoTerreno.findAndCountAll({
      where: { prestador_id: id },
      limit: limit ? limit : 10,
      offset: page ? (page - 1) * limit : 0,
      include: [Prestador, Prestacion, Equipo, EstadoOperativoTerreno],
      order: [["fecha_creacion", "DESC"]],
    });

    if (operativosTerrenos.count < 1) {
      res.status(200).send({
        message: "No se encontraron operativos terrenos.",
        operativosTerrenos: [],
      });
    } else {
      res.status(200).send({ operativosTerrenos: operativosTerrenos });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error:
        "Ha ocurrido un error módulo operativos terrenos al crear el listado de las visitas.",
      message: ex.message,
    });
  }
};

const createOneTerreno = async (req, res) => {
  // const {
  //   empresa_id,
  //   obra_id,
  //   fecha,
  //   prestacion_id,
  //   prestador_id,
  //   equipo_id,
  //   precio,
  //   asistente_social_id,
  //   gestor_id,
  //   asistente_operaciones_id,
  //   company_name,
  //   construction_name,
  //   prestacion_name,
  //   prestador_name,
  //   prestador_rut,
  //   team_name,
  //   team_sucursal_name,
  //   asistente_social_names,
  //   gestor_nombres,
  //   asistente_operaciones_nombres,
  //   construction_address,
  // } = req.body;

  try {
    const createOperacionTerreno = await OperativoTerreno.create({
      ...req.body,
      status: 1,
    });

    if (!createOperacionTerreno) {
      res
        .status(500)
        .send({ error: "Hubo un error al crear la operacion terreno." });
    } else {
      res.status(200).send({
        message: "La operacion terreno ha sido creado correctamente.",
      });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const getOneTerreno = async (req, res) => {
  const { id } = req.params;

  try {
    const operativosTerrenos = await OperativoTerreno.findByPk(id, {
      include: [
        Prestador,
        Prestacion,
        { model: Equipo, include: { model: Integrante } },
        EstadoOperativoTerreno,
      ],
    });

    const empresaObject = await Empresa.findByPk(operativosTerrenos.empresa_id);
    const obraObject = await Obra.findByPk(operativosTerrenos.obra_id);
    const asistenteObject = await User.findByPk(
      operativosTerrenos.asistente_operaciones_id
    );
    const gbsObject = await User.findByPk(operativosTerrenos.gestor_id);

    if (operativosTerrenos.length < 1) {
      res
        .status(200)
        .send({
          message: "No se ha encontrado la operacion terreno.",
          operativosTerrenos: [],
        });
    } else {
      res.status(200).send({
        operativosTerrenos: operativosTerrenos,
        empresa: empresaObject,
        obra: obraObject,
        asistente: asistenteObject,
        gestor: gbsObject,
      });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en el modulo de operacion terreno.",
      message: ex.message,
    });
  }
};

const editOneTerreno = async (req, res) => {
  const {
    empresa_id,
    obra_id,
    fecha,
    prestacion_id,
    prestador_id,
    equipo_id,
    precio,
    asistente_social_id,
    gestor_id,
    asistente_operaciones_id,
    status,
    company_name,
    construction_name,
    prestacion_name,
    prestador_name,
    prestador_rut,
    team_name,
    team_sucursal_name,
    asistente_social_names,
    gestor_nombres,
    asistente_operaciones_nombres,
    construction_address,
  } = req.body;

  const { id } = req.params;

  const updateDate = new Date();

  try {
    const updateOneTerreno = await OperativoTerreno.update(
      {
        empresa_id: empresa_id,
        obra_id: obra_id,
        fecha: fecha,
        prestacion_id: prestacion_id,
        prestador_id: prestador_id,
        equipo_id: equipo_id,
        precio: precio,
        asistente_social_id: asistente_social_id,
        gestor_id: gestor_id,
        asistente_operaciones_id: asistente_operaciones_id,
        fecha_actualizacion: updateDate,
        status: status,
        company_name: company_name,
        construction_name: construction_name,
        prestacion_name: prestacion_name,
        prestador_name: prestador_name,
        prestador_rut: prestador_rut,
        team_name: team_name,
        team_sucursal_name: team_sucursal_name,
        asistente_social_names: asistente_social_names,
        gestor_nombres: gestor_nombres,
        asistente_operaciones_nombres: asistente_operaciones_nombres,
        construction_address: construction_address,
      },
      { where: { id: id } }
    );

    if (!updateOneTerreno) {
      res
        .status(200)
        .send({ message: "No se encontró la operacion terreno.." });
    } else {
      res
        .status(200)
        .send({ message: "Operacion Terreno actualizada correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en el modulo de la operacion terreno.",
      message: ex.message,
    });
  }
};

const cancelOneTerreno = async (req, res) => {
  const { id } = req.params;

  const updateDate = new Date();

  try {
    const cancelOneTerreno = await OperativoTerreno.update(
      {
        status: 6,
        fecha_actualizacion: updateDate,
      },
      { where: { id: id } }
    );

    if (!cancelOneTerreno) {
      res
        .status(200)
        .send({ message: "No se encontró la operacion terreno.." });
    } else {
      res
        .status(200)
        .send({ message: "Operacion terreno cancelado correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en el modulo de la operacion terreno.",
    });
  }
};

const generatePDFDocument = async (req, res) => {
  const data = {};
  //TODO:Luego ajustar la generacion de nombre para el pdf en UUID y subirlo a Azure Storage
  const namePDF = uuidv4();

  const generatePDF = generatePdf(data, `/${namePDF}.pdf`, namePDF);

  res.status(200).send({ message: `${namePDF}.pdf`, documentPDF: generatePDF });
};

const downloadPDFDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const namePDF = "demo";
    const data = await dowloadFilePDF(namePDF);

    res.status(200).send({ message: "Descarga listo.", pdf: data });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en el modulo de la descarga.",
      message: ex.message,
    });
  }
};

const addEtapaToPrestacion = async (req, res) => {
  const { id } = req.params;
  const { id_etapa } = req.body;

  try {
    const addEtapaToPrestacion = await PrestacionesEtapas.create({
      id_etapas: id_etapa,
      id_prestaciones: id,
    });

    if (!addEtapaToPrestacion) {
      res
        .status(500)
        .send({ error: "Hubo un error al agregar la etapa a la prestacion." });
    } else {
      res.status(200).send({
        message: "La etapa a sido agregado a la prestacion correctamente.",
      });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en el modulo de la operacion terreno.",
      message: ex.message,
    });
  }
};
const buildExcelTemplate = async (req, res) => {
  try {
    // TODO: Aqui hay que subir el archivo a azure storage
    const generateExcel = generateTemplateExcel("/template.xlsx", "template");

    if (generateExcel) {
      res.status(200).send({
        message: "El archivo de plantilla de excel a sido generado con exito.",
        path: "",
      });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({
        error: "Ha ocurrido un error al generar excel.",
        message: ex.message,
      });
  }
};

const importDocumentExcel = async (req, res) => {
  let path = __basedir + "/assets/uploads/" + req.file.filename;
  console.log(path);
  console.log("Importando archivo");

  readXlsxFile(path).then((rows) => {
    rows.shift();

    let workers = [];

    rows.map((row, key) => {
      if (key > 0) {
        let worker = {
          rut_trabajador: row[0],
          nombres_trabajador: row[1],
          apellidos_trabajador: row[2],
          fecha_nacimiento: row[3],
          sexo: row[4],
        };

        workers.push(worker);
      }
    });

    Trabajador.bulkCreate(workers)
      .then(() => {
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Fail to import data into database!",
          error: error.message,
        });
      });
  });
};

module.exports = {
  getAll,
  createOneTerreno,
  getOneTerreno,
  editOneTerreno,
  cancelOneTerreno,
  generatePDFDocument,
  addEtapaToPrestacion,
  buildExcelTemplate,
  importDocumentExcel,
  downloadPDFDocument,
  getAllVisits,
};
