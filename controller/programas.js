const { Programas } = require("../models/programas");
const { CuposEdiciones } = require("../models/cupos_ediciones");

const getAll = async (req, res) => {
  const { page, limit } = req.query ? req.query : 1;

  try {
    const programas = await Programas.findAndCountAll({
      limit: limit,
      offset: page,
    });

    if (programas.rows < 1) {
      res
        .status(200)
        .send({ message: "No se encontraron programas.", programas: [] });
    } else {
      res.status(200).send({ status: "OK", programas: programas });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ error: "Ha ocurrido un error." });
  }
};

const createPrograma = async (req, res) => {
  try {
    const createPrograma = await Programas.create(req.body);
    if (!createPrograma) {
      res.status(500).send({ error: "Hubo un error al crear el prestador." });
    } else {
      res.status(200).send({
        message: "El prestador ha sido creado correctamente.",
        programa: createPrograma,
      });
    }
  } catch (ex) {
    res.status(500).send({ message: "error", error: ex });
  }
};

const getOnePrograma = async (req, res) => {
  const { id } = req.params;

  try {
    const programa = await Programas.findByPk(id);

    if (programa.length < 1) {
      res
        .status(200)
        .send({ message: "No se ha encontrado el programa.", programa: [] });
    } else {
      res.status(200).send({ programa });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en modulo programa.",
      message: ex.message,
    });
  }
};

const updateOnePrograma = async (req, res) => {
  const { id } = req.params;
  try {
    const oldProgram = await Programas.findOne({ where: { id } });
    if (oldProgram.cupos !== req.body.cupos) {
      await CuposEdiciones.create({
        programa_id: oldProgram.id,
        valor: req.body.cupos,
        valorantiguo: oldProgram.cupos,
        fecha: new Date().toISOString().split("T")[0],
      });
    }
    const updateProgram = await Programas.update(req.body, {
      where: { id },
    });
    if (!updateProgram) {
      res
        .status(500)
        .send({ error: "Hubo un error al actualizar el programa." });
    } else {
      res
        .status(200)
        .send({ message: "El programa ha sido actualizado correctamente." });
    }
  } catch (ex) {
    res.status(500).send({ message: "error", error: ex });
  }
};

const deleteOnePrograma = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProgram = await Programas.destroy({ where: { id } });
    if (!deleteProgram) {
      res.status(500).send({ error: "Hubo un error al eliminar el programa." });
    } else {
      res
        .status(200)
        .send({ message: "El programa ha sido eliminado correctamente." });
    }
  } catch (ex) {
    res.status(500).send({ message: "error", error: ex });
  }
};

module.exports = {
  getAll,
  createPrograma,
  getOnePrograma,
  updateOnePrograma,
  deleteOnePrograma,
};
