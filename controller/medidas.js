const { Medida } = require("../models/medida");
const { TipoDato } = require("../models/tipo_dato");
const { TipoMedida } = require("../models/tipo_medida");
const { UnidadMedida } = require("../models/unidad_medida");
const { Etapa } = require("../models/etapa");
const { Etapa_Medida } = require("../models/etapa_medida");

const getAll = async (req, res) => {
  const { page, limit, search } = req.query;

  try {
    const measure = await Medida.findAndCountAll({
      include: [TipoDato, TipoMedida, UnidadMedida],
      limit: limit ? limit : 10,
      offset: page ? (page - 1) * limit : 0,
    });

    if (measure.length < 1)
      return res
        .status(400)
        .send({ message: "no se encontraron medidas", medidas: [] });

    return res
      .status(200)
      .send({ status: "OK", medida: measure, total: measure.count });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al traer el listado de medidas.",
      message: ex.message,
    });
  }
};
const createOneMeasures = async (req, res) => {
  const {
    id_tipo_dato,
    id_tipo_medida,
    id_unidad_medida,
    valor_minimo,
    valor_maximo,
    nombre_tipo_medida,
    nombre_tipo_dato,
    nombre_unidad_medida,
  } = req.body;

  try {
    const insertOneMeasures = await Medida.create({
      id_tipo_medida,
      id_tipo_dato,
      id_unidad_medida,
      valor_minimo,
      valor_maximo,
      nombre_tipo_medida,
      nombre_tipo_dato,
      nombre_unidad_medida,
    });

    if (!insertOneMeasures)
      return res.status(500).send({
        message: "A ocurrido un error al intentar registrar la medida",
      });

    return res
      .status(201)
      .send({ message: "se ha registrado correctamente la medida" });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al crear una medida.",
      message: ex.message,
    });
  }
};
const editOneMeasures = async (req, res) => {
  const { id } = req.params;
  const {
    id_tipo_dato,
    id_tipo_medida,
    id_unidad_medida,
    valor_minimo,
    valor_maximo,
    nombre_tipo_medida,
    nombre_tipo_dato,
    nombre_unidad_medida,
  } = req.body;

  try {
    const editOneMeasure = await Medida.update(
      {
        id_tipo_medida,
        id_tipo_dato,
        id_unidad_medida,
        valor_minimo,
        valor_maximo,
        nombre_tipo_medida,
        nombre_tipo_dato,
        nombre_unidad_medida,
      },
      { where: { id } }
    );

    if (!editOneMeasure)
      return res
        .status(500)
        .send({ message: "Error al intentar actualizar la medida" });

    return res.status(200).send({
      status: "OK",
      message: "Se a actualizado la medida correctamente",
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al actualizar la medida.",
      message: ex.message,
    });
  }
};
const showOneMeasures = async (req, res) => {
  const { id } = req.params;
  try {
    const foundedMeasure = await Medida.findByPk(id, {
      include: [TipoDato, TipoMedida, UnidadMedida],
    });
    if (!foundedMeasure)
      return res.status(500).send({ message: "No se encontró la medida" });
    return res.status(200).send({ status: "OK", medida: foundedMeasure });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error buscar la medida.",
      message: ex.message,
    });
  }
};
const deleteMeasure = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteMedida = Medida.destroy({
      where: { id: id },
    });
    if (!deleteMedida)
      return res
        .status(500)
        .send({ message: "Error al intentar eliminar la medida" });
    return res
      .status(200)
      .send({ status: "OK", message: "Se ha eliminado la medida con exito" });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al intentar eliminar la medida.",
      message: ex.message,
    });
  }
};
const getAllTypeMeasure = async (req, res) => {
  try {
    const allTypeMeasure = await TipoMedida.findAll();

    if (!allTypeMeasure)
      return res.status(400).send({
        status: "FAILED",
        message: "No se encontraron tipos de medida",
      });

    return res.status(200).send({ status: "OK", tipo_medidas: allTypeMeasure });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al traer los tipos de medida.",
      message: ex.message,
    });
  }
};
const getAllTypeData = async (req, res) => {
  try {
    const allTypeData = await TipoDato.findAll();

    if (!allTypeData)
      return res.status(400).send({
        status: "FAILED",
        message: "No se encontraron tipos de dato para la medida",
      });

    return res.status(200).send({ status: "OK", tipo_datos: allTypeData });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al traer el tipo de dato de las medidas.",
      message: ex.message,
    });
  }
};
const getAllUnityMeasure = async (req, res) => {
  try {
    const allUnityMeasure = await UnidadMedida.findAll();

    if (!allUnityMeasure)
      return res.status(400).send({
        status: "FAILED",
        message: "No se encontraron unidades de medida",
      });

    return res
      .status(200)
      .send({ status: "OK", unidad_medida: allUnityMeasure });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al traer las unidades de medida.",
      message: ex.message,
    });
  }
};

const asociateMedidaEtapa = async (req, res) => {
  try {
    const { id_etapa, medidas } = req.body;

    if (!id_etapa) res.status(200).send({ message: "No se encontró la etapa" });
    if (!medidas) res.status(200).send({ message: "No se encontró la medida" });

    for (const medida of medidas) {
      await Etapa_Medida.create({
        id_etapa,
        id_medida: medida,
      });
    }
    res.status(200).send({ message: "Asociación exitosa." });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      message: "Error al asociar una etapa con una medida",
      error: ex,
    });
  }
};

const getAsociationsByEtapa = async (req, res) => {
  try {
    const { id_etapa, limit, page } = req.params;

    const foundedAsociation = await Etapa_Medida.findAndCountAll({
      include: [Medida, Etapa],
      limit: limit ? limit : 10,
      offset: page ? (page - 1) * limit : 0,
      where: { id_etapa },
    });

    if (!id_etapa)
      res
        .status(200)
        .send({ message: "Debe enviar el id de la etapa que busca." });

    if (!foundedAsociation)
      res.status(200).send({
        message: "No se encontraron medidas asociadas a esta etapa",
        rows: [],
      });

    if (foundedAsociation)
      res.status(200).send({
        message: "Búsqueda exitosa.",
        rows: foundedAsociation.rows,
        total: foundedAsociation.count,
      });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      message: "Error al intentar buscar las medidas de la etapa",
      error: ex,
    });
  }
};

module.exports = {
  getAll,
  createOneMeasures,
  editOneMeasures,
  deleteMeasure,
  showOneMeasures,
  getAllTypeMeasure,
  getAllUnityMeasure,
  getAllTypeData,
  asociateMedidaEtapa,
  getAsociationsByEtapa,
};
