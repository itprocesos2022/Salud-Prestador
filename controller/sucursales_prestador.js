const { SucursalesPrestadores } = require("../models/sucursales_prestadores");

const getAll = async (req, res) => {
  const { page, limit } = req.query ? req.query : 1;

  try {
    const sucursalesPrestadores = await SucursalesPrestadores.findAndCountAll({
      limit: limit,
      offset: page,
    });

    if (sucursalesPrestadores.rows.length < 1) {
      res.status(200).send({ message: "No se encontraron sucursales.", sucursales: [] });
    } else {
      res.status(200).send({ sucursales: sucursalesPrestadores });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error al obtener las sucursales.", message: ex.message });
  }
};

const getOneSucursal = async (req, res) => {
  const { id } = req.params;
  try {
    const sucursal = await SucursalesPrestadores.findByPk(id);

    if (sucursal.length < 1) {
      res.status(200).send({ message: "No se ha encontrado la sucursal.", sucursal: [] });
    } else {
      res.status(200).send({ sucursal: sucursal });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error el obtener la sucursal.", message: ex.message});
  }
};

const getAllSucursalByRegion = async (req, res) => {
  const { region } = req.query;
  try {
    const sucursal = await SucursalesPrestadores.findAll({
      where: { region_sucursal: region, estado_sucursal: true },
    });

    if (sucursal.length < 1) {
      res
        .status(200)
        .send({ message: `No se han encontrado sucursales en ${region}.` });
    } else {
      res.status(200).send({ sucursal: sucursal });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error el obtener la sucursal por región.",
      message: ex.message,
    });
  }
};

const getAllSucursalByPrestador = async (req, res) => {
  const { prestador_id } = req.query;
  try {
    const sucursal = await SucursalesPrestadores.findAll({
      where: { prestador_id: prestador_id, estado_sucursal: true },
    });

    if (sucursal.length < 1) {
      res.status(200).send({
        message: `No se han encontrado sucursales asociadas al prestador ${prestador_id}.`,
      });
    } else {
      res.status(200).send({ sucursal: sucursal });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error el obtener las sucursales por prestador.",
      message: ex.message
    });
  }
};

const createSucursal = async (req, res) => {
  const {
    direccion_sucursal,
    region_sucursal,
    comuna_sucursal,
    tipo_sucursal,
    telefono_sucursal,
    email_sucursal,
    estado_sucursal,
    prestador_id,
    nombre_prestador,
    nombre_sucursal,
  } = req.body;

  try {
    const createSucursal = await SucursalesPrestadores.create({
      direccion_sucursal: direccion_sucursal,
      region_sucursal: region_sucursal,
      comuna_sucursal: comuna_sucursal,
      tipo_sucursal: tipo_sucursal,
      telefono_sucursal: telefono_sucursal,
      email_sucursal: email_sucursal,
      estado_sucursal: estado_sucursal,
      prestador_id: prestador_id,
      nombre_prestador: nombre_prestador,
      nombre_sucursal: nombre_sucursal,
    });

    if (!createSucursal) {
      res.status(500).send({ error: "Hubo un error al crear la sucursal." });
    } else {
      res.status(200).send({
        message: "La sucursal ha sido creado correctamente.",
      });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error al crear la sucursal.", message: ex.message });
  }
};

const editSucursal = async (req, res) => {
  const { id } = req.params;
  const {
    direccion_sucursal,
    region_sucursal,
    comuna_sucursal,
    tipo_sucursal,
    telefono_sucursal,
    email_sucursal,
    estado_sucursal,
    prestador_id,
    nombre_prestador,
    nombre_sucursal,
  } = req.body;

  try {
    const editedSucursal = await SucursalesPrestadores.update(
      {
        direccion_sucursal: direccion_sucursal,
        region_sucursal: region_sucursal,
        comuna_sucursal: comuna_sucursal,
        tipo_sucursal: tipo_sucursal,
        telefono_sucursal: telefono_sucursal,
        email_sucursal: email_sucursal,
        estado_sucursal: estado_sucursal,
        prestador_id: prestador_id,
        nombre_prestador: nombre_prestador,
        nombre_sucursal: nombre_sucursal,
      },
      { where: { id: id } }
    );

    if (!editedSucursal) {
      res.status(500).send({ error: "Hubo un error al editar la sucursal." });
    } else {
      res.status(200).send({
        message: "La sucursal ha sido editada correctamente.",
      });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error al editar la sucursal.", message: ex.message});
  }
};

const deleteSucursal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSucursal = await SucursalesPrestadores.update(
      {
        estado_sucursal: false,
      },
      { where: { id: id } }
    );

    if (!deletedSucursal) {
      res.status(500).send({ error: "Hubo un error al eliminar la sucursal." });
    } else {
      res.status(200).send({
        message: "La sucursal ha sido eliminada correctamente.",
      });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error al eliminar la sucursal.", message: ex.message});
  }
};

module.exports = {
  getAll,
  getOneSucursal,
  getAllSucursalByRegion,
  getAllSucursalByPrestador,
  createSucursal,
  editSucursal,
  deleteSucursal,
};
