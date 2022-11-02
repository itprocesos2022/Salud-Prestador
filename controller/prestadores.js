const { Prestador } = require("../models/prestador");
const { PrestadorContacto } = require("../models/prestador_contacto");
const { PrestadorDireccion } = require("../models/prestador_direccion");
const { PrestadorPrestacion } = require("../models/preestador_prestacion");
const { SucursalesPrestadores } = require("../models/sucursales_prestadores");
const { Prestacion } = require("../models/prestacion");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  const { page, limit } = req.query ? req.query : 1;

  try {
    const prestadores = await Prestador.findAndCountAll({
      limit: limit,
      offset: page,
    });

    if (prestadores.rows < 1) {
      res
        .status(200)
        .send({ message: "No se encontraron prestadores.", prestadores: [] });
    } else {
      res.status(200).send({ status: "OK", prestadores: prestadores });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ error: "Ha ocurrido un error." });
  }
};

const createPrestador = async (req, res) => {
  const { prestador_rut, razon_social, direccion, nombre } = req.body;

  try {
    const createPrestador = await Prestador.create({
      prestador_rut: prestador_rut.toUpperCase(),
      razon_social: razon_social.toUpperCase(),
      address: direccion,
      nombre_prestador: nombre,
    });

    if (!createPrestador) {
      res.status(500).send({ error: "Hubo un error al crear el prestador." });
    } else {
      res
        .status(200)
        .send({ message: "El prestador ha sido creado correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const getOnePrestador = async (req, res) => {
  const { id } = req.params;

  try {
    const prestador = await Prestador.findByPk(id, {
      include: [
        PrestadorContacto,
        PrestadorDireccion,
        SucursalesPrestadores,
        {
          model: Prestacion,
          through: {
            where: {
              estado_relacion: "1",
            },
          },
        },
      ],
    });

    if (prestador.length < 1) {
      res
        .status(200)
        .send({ message: "No se ha encontrado el prestador.", prestador: [] });
    } else {
      res.status(200).send({ prestador: prestador });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en modulo prestador.",
      message: ex.message,
    });
  }
};

const updateOnePrestador = async (req, res) => {
  const { id } = req.params;
  const { prestador_rut, razon_social, direccion, nombre, telefono, email } =
    req.body;

  try {
    const updatePrestador = await Prestador.update(
      {
        prestador_rut: prestador_rut.toUpperCase(),
        razon_social: razon_social.toUpperCase(),
        address: direccion,
        nombre_prestador: nombre,
      },
      {
        where: { id: id },
      }
    );

    const prestadorContactoData = await PrestadorContacto.findOne({
      where: { id: id },
    });

    if (prestadorContactoData) {
      await PrestadorContacto.update(
        {
          email_contacto: email,
          telefono_1: telefono,
          nombre_contacto: nombre,
        },
        { where: { id_prestador: id } }
      );
    } else {
      await PrestadorContacto.create({
        id_prestador: id,
        email_contacto: email,
        telefono_1: telefono,
        nombre_contacto: nombre,
      });
    }

    if (!updatePrestador) {
      res
        .status(500)
        .send({ error: "Hubo un error al actualizar el prestador." });
    } else {
      res
        .status(200)
        .send({ message: "El prestador ha sido actualizado correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en modulo prestador.",
      message: ex.message,
    });
  }
};

const deletePrestador = async (req, res) => {
  const { id } = req.params;

  try {
    const deletePrestador = await Prestador.update(
      { estado: false },
      {
        where: { id: id },
      }
    );

    if (!deletePrestador) {
      res
        .status(500)
        .send({ message: "Ha ocurrido un error al eliminar el prestador." });
    } else {
      res
        .status(200)
        .send({ message: "El prestador ha sido eliminado correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en modulo prestador.",
      message: ex.message,
    });
  }
};

const listPrestacionesOfOnePrestador = async (req, res) => {
  const { id } = req.params;

  try {
    const listPrestador = await Prestador.findAndCountAll({
      include: {
        model: Prestacion,
        through: {
          where: {
            estado_relacion: "1",
          },
        },
        where: {
          estado_prestacion: true,
        },
      },
      through: [PrestadorPrestacion],
      where: { id: id },
    });

    if (listPrestador.length < 1) {
      res.status(200).send({
        message: "No se ha encontrado el prestador.",
        listPrestador: [],
      });
    } else {
      res.status(200).send({ prestador: listPrestador });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en modulo prestador.",
      message: ex.message,
    });
  }
};

const listPrestacionesNotLoadedOfOnePrestador = async (req, res) => {
  const { id } = req.params;

  try {
    const arrayPrestacion = [];

    const listPrestadorPrestacion = await PrestadorPrestacion.findAll({
      where: { id_prestador: id },
      attributes: ["id_prestacion"],
      group: "id_prestacion",
    });

    listPrestadorPrestacion.forEach((prestadorPrestacion) => {
      arrayPrestacion.push(parseInt(prestadorPrestacion.id_prestacion));
    });

    const listPrestacion = await Prestacion.findAll({
      attributes: ["id", "nombre_prestacion"],
      where: {
        id: {
          [Op.notIn]: arrayPrestacion,
        },
      },
    });

    if (listPrestacion.length < 1) {
      res.status(200).send({
        message: "No se ha encontrado el prestador.",
        listPrestacion: [],
      });
    } else {
      res.status(200).send({ prestaciones: listPrestacion });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en modulo prestador.",
      message: ex.message,
    });
  }
};

const addPrestacionToPrestador = async (req, res) => {
  const { id } = req.params;
  const { prestaciones, precios } = req.body;
  console.log(req.body);
  console.log(precios);

  try {
    let findOnePrestador = Prestador.findByPk(id);

    if (!findOnePrestador) {
      res.status(404).send({ message: "No se ha encontrado el prestador." });
      return;
    }

    for (const presentacion of prestaciones) {
      await PrestadorPrestacion.create({
        id_prestador: id,
        id_prestacion: presentacion.id_prestacion,
        ...precios,
      });
    }

    res.status(200).send({
      message: "El prestador ha sido agregado a la prestacion correctamente.",
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en modulo prestador.",
      message: ex.message,
    });
  }
};

const removeOnePrestacionToPrestador = async (req, res) => {
  const { id } = req.params;
  const { id_prestacion } = req.body;

  try {
    await PrestadorPrestacion.destroy({
      where: {
        id_prestacion: id,
        id_prestacion: id_prestacion,
      },
    });

    res.status(200).send({
      message: "El prestador ha sido removido a la prestacion correctamente.",
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error en modulo prestador.",
      message: ex.message,
    });
  }
};

module.exports = {
  getAll,
  createPrestador,
  getOnePrestador,
  updateOnePrestador,
  deletePrestador,
  listPrestacionesOfOnePrestador,
  addPrestacionToPrestador,
  listPrestacionesNotLoadedOfOnePrestador,
  removeOnePrestacionToPrestador,
};
