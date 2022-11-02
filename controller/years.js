const { Year } = require("../models/year");

const getAll = async (req, res) => {
  const { page, limit, search } = req.query;

  try {
    const result = await Year.findAndCountAll({
      limit: limit ? limit : 10,
      offset: page ? (page - 1) * limit : 0,
    });

    if (result.length < 1)
      return res
        .status(400)
        .send({ message: "No se encontraron años.", years: [] });

    return res
      .status(200)
      .send({ status: "OK", years: result, total: result.count });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al traer el listado de años.",
      message: ex.message,
    });
  }
};
const createOneYear = async (req, res) => {
  const { year, desde, hasta } = req.body;

  try {
    const insertOneYears = await Year.create({
      year,
      desde,
      hasta,
    });

    if (!insertOneYears)
      return res.status(500).send({
        message: "A ocurrido un error al intentar registrar el año",
      });

    return res
      .status(201)
      .send({ message: "se ha registrado correctamente el año" });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al crear un año.",
      message: ex.message,
    });
  }
};
const editOneYears = async (req, res) => {
  const { id } = req.params;
  const { desde, hasta } = req.body;

  try {
    const editOneYear = await Year.update(
      {
        desde,
        hasta,
      },
      { where: { id } }
    );

    if (!editOneYear)
      return res
        .status(500)
        .send({ message: "Error al intentar actualizar el año." });

    return res.status(200).send({
      status: "OK",
      message: "Se a actualizado el año correctamente.",
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al actualizar el año.",
      message: ex.message,
    });
  }
};

const deleteYear = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteYear = Year.destroy({
      where: { id },
    });
    if (!deleteYear)
      return res
        .status(500)
        .send({ message: "Error al intentar eliminar el año." });
    return res
      .status(200)
      .send({ status: "OK", message: "Se ha eliminado el año con exito" });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al intentar eliminar el año.",
      message: ex.message,
    });
  }
};
// const getAllTypeYear = async (req, res) => {
//   try {
//     const allTypeYear = await TipoMedida.findAll();

//     if (!allTypeYear)
//       return res.status(400).send({
//         status: "FAILED",
//         message: "No se encontraron tipos de medida",
//       });

//     return res.status(200).send({ status: "OK", tipo_medidas: allTypeYear });
//   } catch (ex) {
//     console.error(ex);
//     res.status(500).send({
//       error: "Ha ocurrido un error al traer los tipos de medida.",
//       message: ex.message,
//     });
//   }
// };
// const getAllTypeData = async (req, res) => {
//   try {
//     const allTypeData = await TipoDato.findAll();

//     if (!allTypeData)
//       return res.status(400).send({
//         status: "FAILED",
//         message: "No se encontraron tipos de dato para la medida",
//       });

//     return res.status(200).send({ status: "OK", tipo_datos: allTypeData });
//   } catch (ex) {
//     console.error(ex);
//     res.status(500).send({
//       error: "Ha ocurrido un error al traer el tipo de dato de las medidas.",
//       message: ex.message,
//     });
//   }
// };
// const getAllUnityYear = async (req, res) => {
//   try {
//     const allUnityYear = await UnidadMedida.findAll();

//     if (!allUnityYear)
//       return res.status(400).send({
//         status: "FAILED",
//         message: "No se encontraron unidades de medida",
//       });

//     return res
//       .status(200)
//       .send({ status: "OK", unidad_medida: allUnityYear });
//   } catch (ex) {
//     console.error(ex);
//     res.status(500).send({
//       error: "Ha ocurrido un error al traer las unidades de medida.",
//       message: ex.message,
//     });
//   }
// };

// const asociateMedidaEtapa = async (req, res) => {
//   try {
//     const { id_etapa, medidas } = req.body;

//     if (!id_etapa) res.status(200).send({ message: "No se encontró la etapa" });
//     if (!medidas) res.status(200).send({ message: "No se encontró la medida" });

//     for (const medida of medidas) {
//       await Etapa_Medida.create({
//         id_etapa,
//         id_medida: medida,
//       });
//     }
//     res.status(200).send({ message: "Asociación exitosa." });
//   } catch (ex) {
//     console.error(ex);
//     res.status(500).send({
//       message: "Error al asociar una etapa con una medida",
//       error: ex,
//     });
//   }
// };

// const getAsociationsByEtapa = async (req, res) => {
//   try {
//     const { id_etapa, limit, page } = req.params;

//     const foundedAsociation = await Etapa_Medida.findAndCountAll({
//       include: [Medida, Etapa],
//       limit: limit ? limit : 10,
//       offset: page ? (page - 1) * limit : 0,
//       where: { id_etapa },
//     });

//     if (!id_etapa)
//       res
//         .status(200)
//         .send({ message: "Debe enviar el id de la etapa que busca." });

//     if (!foundedAsociation)
//       res.status(200).send({
//         message: "No se encontraron medidas asociadas a esta etapa",
//         rows: [],
//       });

//     if (foundedAsociation)
//       res.status(200).send({
//         message: "Búsqueda exitosa.",
//         rows: foundedAsociation.rows,
//         total: foundedAsociation.count,
//       });
//   } catch (ex) {
//     console.error(ex);
//     res.status(500).send({
//       message: "Error al intentar buscar las medidas de la etapa",
//       error: ex,
//     });
//   }
// };

module.exports = {
  getAll,
  createOneYear,
  editOneYears,
  deleteYear,
};
