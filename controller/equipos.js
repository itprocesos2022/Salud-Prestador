const { validationResult } = require("express-validator");
const { Equipo, EquipoPrestaciones } = require("../models/equipo");
const { Prestador } = require("../models/prestador");
const { Prestacion } = require("../models/prestacion");
const { Integrante, IntegrantesPrestaciones } = require("../models/integrante");
const { Op } = require("sequelize");
const EquipoSucursal = require("../models/equipo_sucursal");

const getAll = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id_prestador, page, limit, search } = req.query ? req.query : 1;

  try {
    const teams = await Equipo.findAndCountAll({
      include: [Prestador, Prestacion, Integrante],
      through: EquipoPrestaciones,
      where: {
        id_prestador: id_prestador,
        nombre: {
          [Op.like]: `%${search}%`,
        },
      },

      limit: limit,
      offset: page,
    });

    if (teams.rows.length < 1) {
      res
        .status(200)
        .send({ message: "No se encontraron equipos.", equipos: [] });
    } else {
      res.status(200).send({ status: "OK", equipos: teams });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error módulo equipos.",
      message: ex.message,
    });
  }
};

const createOneTeam = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { nombre, region, comuna, sucursal, id_prestador, prestaciones } =
    req.body;

  try {
    const insertTeamValue = await Equipo.create({
      nombre: nombre,
      region: region,
      comuna: comuna,
      sucursal: sucursal,
      id_prestador: id_prestador,
      estado: true,
    });

    if (!insertTeamValue) {
      res
        .status(404)
        .send({ message: "Ha ocurrido un error al crear el equipo." });
    } else {
      const equipo_id = insertTeamValue.id;

      if (prestaciones.length > 0) {
        prestaciones.forEach(async (presentacion) => {
          await EquipoPrestaciones.create({
            id_equipo: equipo_id,
            id_prestacion: presentacion.id_prestacion,
          });
        });
      }

      res.status(200).send({ message: "Equipo creado correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ error: "Ha ocurrido un error." });
  }
};

const getOneTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const equipo = await Equipo.findByPk(id, {
      include: [Prestador, Prestacion, Integrante],
      through: EquipoPrestaciones,
    });

    if (equipo.length < 1) {
      res
        .status(200)
        .send({ message: "No se ha encontrado el equipo.", equipo: [] });
    } else {
      res.status(200).send({ equipo: equipo });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ error: "Ha ocurrido un error." });
  }
};

const addPersonalFromTeam = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { integrantes } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ errors: "El parametro ID es requerido, el ID del equipo" });

  try {
    let insertProfessional = {};

    integrantes.forEach(async (integrante) => {
      insertProfessional = await Integrante.create({
        rut: integrante.rut,
        nombres: integrante.nombres,
        apellidos: integrante.apellidos,
        id_equipo: id,
      });

      const id_integrante = insertProfessional.id;

      if (integrante.prestaciones.length > 0) {
        integrante.prestaciones.forEach(async (prestacion) => {
          await IntegrantesPrestaciones.create({
            id_integrante: id_integrante,
            id_prestacion: prestacion.id_prestacion,
          });
        });
      }
    });

    if (insertProfessional) {
      return res
        .status(200)
        .send({ message: "Integrantes agregados correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    return res.status(500).send({
      error: "Ha ocurrido un error en el modulo de equipos.",
      message: ex.message,
    });
  }
};

const updatePersonalFromTeam = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id, integranteid } = req.params;
  const { rut, nombres, apellidos, prestaciones } = req.body;

  let updateIntegrante = {};

  try {
    updateIntegrante = await Integrante.update(
      {
        rut: rut,
        nombres: nombres,
        apellidos: apellidos,
        id_equipo: id,
      },
      { where: { id_equipo: id, id: integranteid } }
    );

    if (updateIntegrante) {
      if (prestaciones.length > 0) {
        prestaciones.forEach(async (prestacion) => {
          await IntegrantesPrestaciones.destroy({
            where: { id_integrante: integranteid },
          });

          await IntegrantesPrestaciones.create({
            id_integrante: integranteid,
            id_prestacion: prestacion.id_prestacion,
          });
        });
      }
      return res
        .status(200)
        .send({ message: "Integrantes actualizados correctamente." });
    }
  } catch (e) {
    console.error(ex);
    return res.status(500).send({
      error: "Ha ocurrido un error en el modulo de equipos.",
      message: ex.message,
    });
  }
};

const deletePersonalFromTeam = async (req, res) => {
  const { id } = req.params; // equipo id
  const { id_integrante } = req.body; // id integrante a eliminar

  try {
    const deletePersonalFromTeam = await Integrante.destroy({
      where: { id: id_integrante, id_equipo: id },
    });

    if (!deletePersonalFromTeam) {
      res.status(500).send({
        message: "Ha ocurrido un error al eliminar el integrante del equipo.",
      });
    } else {
      const deleteRelationship = await IntegrantesPrestaciones.destroy({
        where: { id_integrante: id_integrante },
      });

      res
        .status(200)
        .send({ message: "El integrante a sido eliminado con exito." });
    }
  } catch (ex) {
    console.error(ex);
    return res.status(500).send({
      error: "Ha ocurrido un error en el modulo de equipos.",
      message: ex.message,
    });
  }
};

const editOneTeam = async (req, res) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty())
  //   return res.status(400).json({ errors: errors.array() });

  const updateDate = new Date();
  const { id } = req.params;

  try {
    const teamUpdate = await Equipo.update(
      {
        ...req.body,
        fecha_actualizacion: updateDate,
      },
      { where: { id: id } }
    );

    if (!teamUpdate) {
      res.status(200).send({ message: "No se encontró el equipo." });
    } else {
      // if (prestaciones.length > 0) {
      //   prestaciones.forEach(async (presentacion) => {
      //     await EquipoPrestaciones.update(
      //       {
      //         id_equipo: id,
      //         id_prestacion: presentacion.id_prestacion,
      //       },
      //       { where: { id_equipo: id } }
      //     );
      //   });
      // }

      res
        .status(200)
        .send({ message: "Equipo actualizado correctamente.", teamUpdate });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const deleteTeam = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const estado = false;
  const updateDate = new Date();
  try {
    const teamUpdate = await Equipo.update(
      {
        estado: estado,
        fecha_actualizacion: updateDate,
      },
      { where: { id: id } }
    );

    if (!teamUpdate) {
      res.status(200).send({ message: "No se encontró el equipo." });
    } else {
      res.status(200).send({ message: "Equipo eliminado correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const addSucursalToTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_equipo } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ errors: "El parametro ID es requerido, el ID de la sucursal" });
    }

    const insertSucursalToTeam = await EquipoSucursal.create({
      id_equipo: id_equipo,
      id_sucursal: id,
    });

    if (insertSucursalToTeam) {
      return res
        .status(200)
        .send({ message: "Sucursal agregados al equipo correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const getTeamsToSucursal = async (req, res) => {
  try {
    const { id } = req.params;

    const allEquiposToSucursal = await EquipoSucursal.findAll({
      where: {
        id_sucursal: id,
      },
      include: [Equipo],
    });

    if (allEquiposToSucursal) {
      return res.status(200).send({ equipos: allEquiposToSucursal });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

module.exports = {
  getAll,
  createOneTeam,
  getOneTeam,
  editOneTeam,
  deleteTeam,
  addPersonalFromTeam,
  updatePersonalFromTeam,
  deletePersonalFromTeam,
  addSucursalToTeam,
  getTeamsToSucursal,
};
