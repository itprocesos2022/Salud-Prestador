const { Etapa } = require("../models/etapa");
const {
  Prestacion,
  PrestacionesEtapas,
  PrestacionesBeneficiarios,
} = require("../models/prestacion");
const { TipoBeneficiario } = require("../models/tipo_beneficiario");
const { PrestadorPrestacion } = require("../models/preestador_prestacion");
const {PrestacionSucursal} = require("../models/prestacion_sucursal");
const { SucursalesPrestadores } = require("../models/sucursales_prestadores");

const getAll = async (req, res) => {
  const { page, limit } = req.query ? req.query : 1;

  try {
    const prestaciones = await Prestacion.findAndCountAll({
      limit: limit,
      offset: page,
      where: {
        estado_prestacion: true,
      },
    });

    if (prestaciones.rows.length < 1) {
      res
        .status(200)
        .send({ message: "No se encontraron prestaciones.", prestaciones: [] });
    } else {
      res.status(200).send({ status: "OK", prestaciones: prestaciones });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error módulo prestaciones." });
  }
};

const getOnePrestacion = async (req, res) => {
  const { id } = req.params;
  try {
    const presentacionOne = await Prestacion.findByPk(id);

    if (presentacionOne.length < 1) {
      res
        .status(200)
        .send({
          message: "No se ha encontrado la prestación.",
          presentacionOne: [],
        });
    } else {
      res.status(200).send({ prestacion: presentacionOne });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const getEtapas = async (req, res) => {
  const { id } = req.params;

  try {
    const obtenerEtapas = await Prestacion.findByPk(id, {
      include: [Etapa],
      order:[
        [{model: Etapa, as: 'Etapa'}, 'orden_etapa', 'ASC']
      ],
      through: PrestacionesEtapas,
    });

    if (obtenerEtapas.etapas.length < 1) {
      res
        .status(200)
        .send({ message: "No se han encontrado etapas.", etapas: [] });
    } else {
      res.status(200).send({ etapas: obtenerEtapas.etapas });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const createOne = async (req, res) => {
  const { name, tope_prestacion, description, type } = req.body;
  const state = true;
  try {
    const presentacionCreate = await Prestacion.create({
      nombre_prestacion: name,
      tope_prestacion: tope_prestacion,
      descripcion_prestacion: description,
      estado_prestacion: state,
      type: type,
    });

    if (!presentacionCreate) {
      res
        .status(500)
        .send({ message: "Ha ocurrido un error al crear la prestación." });
    } else {
      res.status(200).send({ message: "Prestación creada correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ error: "Ha ocurrido un error." });
  }
};

const editOne = async (req, res) => {
  const { name, tope_prestacion, description, state, type } = req.body;
  const { id } = req.params;
  const updateDate = new Date();
  try {
    const updatePrestacion = await Prestacion.update(
      {
        nombre_prestacion: name,
        tope_prestacion: tope_prestacion,
        descripcion_prestacion: description,
        estado_prestacion: state,
        type: type,
        fecha_actualizacion: updateDate,
      },
      { where: { id: id } }
    );

    if (!updatePrestacion) {
      res.status(500).send({ message: "No se encontró la prestación." });
    } else {
      res
        .status(200)
        .send({ message: "Prestación actualizada correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const deletePrestacion = async (req, res) => {
  const { id } = req.params;
  const state = false;
  const updateDate = new Date();
  try {
    const deletePrestacion = await Prestacion.update(
      {
        estado_prestacion: state,
        fecha_actualizacion: updateDate,
      },
      { where: { id: id } }
    );

    await PrestadorPrestacion.update(
      {
        estado_prestacion: "0",
        fecha_actualizacion: updateDate,
      },
      { where: { id_prestacion: id } }
    );

    if (!deletePrestacion) {
      res.status(500).send({ message: "No se encontró la prestación." });
    } else {
      res.status(200).send({ message: "Prestación eliminada correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const activatePrestacion = async (req, res) => {
  const { id } = req.params;
  const state = true;
  const updateDate = new Date();
  try {
    const activePrestacion = await Prestacion.update(
      {
        estado_prestacion: state,
        fecha_actualizacion: updateDate,
      },
      { where: { id: id } }
    );

    if (!activePrestacion) {
      res.status(500).send({ message: "No se encontró la prestación." });
    } else {
      res.status(200).send({ message: "Prestación activada correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const createEtapa = async (req, res) => {
  const { name, order, description } = req.body;
  try {
    const createEtapa = await Etapa.create({
      nombre_etapa: name,
      orden_etapa: order,
      descripcion_etapa: description,
    });

    if (!createEtapa) {
      res
        .status(500)
        .send({ message: "Ha ocurrido un error al crear la etapa." });
    } else {
      res
        .status(200)
        .send({
          message: "Etapa creada correctamente.",
          id_etapa: createEtapa.id,
        });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const asociateEtapa = async (req, res) => {
  const { id } = req.params;
  const { id_etapa } = req.body;

  try {
    const lastEtapa = await Etapa.findAll({ id: id_etapa });

    if (!lastEtapa) {
      res.status(500).send({ message: "No se han encontrado etapas." });
    } else {
      const insertPrestacionesEtapa = await PrestacionesEtapas.create({
        id_prestaciones: id,
        id_etapas: id_etapa,
      });

      if (!insertPrestacionesEtapa) {
        res
          .status(500)
          .send({ message: "Ha ocurrido un error al crear la etapa." });
      } else {
        res.status(200).send({ message: "Asociación creada correctamente." });
      }
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const updateEtapa = async (req, res) => {
  const { id } = req.params;
  const { name, order, description } = req.body;
  const updateDate = new Date();

  const updateEtapa = await Etapa.update(
    {
      nombre_etapa: name,
      orden_etapa: order,
      descripcion_etapa: description,
      fecha_actualizacion: updateDate,
    },
    { where: { id: id } }
  );

  if (!updateEtapa) {
    res
      .status(500)
      .send({ message: "Ha ocurrido un error al editar la etapa." });
  } else {
    res.status(200).send({ message: "Etapa editada correctamente." });
  }
};

const deleteAsociation = async (req, res) => {
  
  try{
    const { id } = req.params;
    const { idEtapa } = req.body;
  
    const deleteAsociation = PrestacionesEtapas.destroy({
      where: { id_prestaciones: id, id_etapas: idEtapa },
    });
  
    if (!deleteAsociation) {
      res
        .status(500)
        .send({ message: "Ha ocurrido un error al eliminar la relación." });
    } else {
      res
        .status(200)
        .send({ message: "La etapa se ha quitado de esta prestación." });
    }
  }catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({
        error: "Ha ocurrido un error módulo etapa de prestacion.",
        message: ex.message,
      });
  }

};

const getAllBeneficiaryType = async (req, res) => {
  try {
    const getAllBeneficiaryType = await TipoBeneficiario.findAll();

    if (getAllBeneficiaryType.length < 1) {
      res
        .status(200)
        .send({ message: "No se encontraron tipos.", beneficiaryType: [] });
    } else {
      res.status(200).send({ beneficiaryType: getAllBeneficiaryType });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({
        error: "Ha ocurrido un error módulo tipos.",
        message: ex.message,
      });
  }
};

const asociateTypeAndPrestacion = async (req, res) => {
  const { id } = req.params;
  const { idType } = req.body;
  try {
    const insertTypePrestacionValue = await PrestacionesBeneficiarios.create({
      id_prestacion: id,
      id_beneficiario: idType,
    });

    if (!insertTypePrestacionValue) {
      res
        .status(500)
        .send({ message: "Ha ocurrido un error al asignar el beneficiario." });
    } else {
      res.status(200).send({ message: "Beneficiario asignado correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error:
        "Ha ocurrido un error al intentar crear la asociación entre el tipo y la prestación.",
      message: ex.message,
    });
  }
};

const getTypes = async (req, res) => {
  const { id } = req.params;

  try {
    const getTypes = await Prestacion.findByPk(id, {
      include: TipoBeneficiario,
      through: PrestacionesBeneficiarios,
    });

    if (getTypes.tipo_beneficiarios.length < 1) {
      res
        .status(200)
        .send({ message: "No se han encontrado tipos de beneficiarios." });
    } else {
      res.status(200).send({ type: getTypes.tipo_beneficiarios });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error: "Ha ocurrido un error al buscar los tipos de beneficiarios.",
      message: ex.message,
    });
  }
};

const deleteTypeAsociation = async (req, res) => {
  try {
    const { id } = req.params;
    const { idBeneficiario } = req.body;

    const deleteTypeAsociation = await PrestacionesBeneficiarios.destroy({
      where: { id_prestacion: id, id_beneficiario: idBeneficiario },
    });

    if (!deleteTypeAsociation) {
      res.status(500).send({
        message:
          "Ha ocurrido un error al eliminar la relación entre prestación y beneficiario.",
      });
    } else {
      res
        .status(200)
        .send({ message: "La etapa se ha quitado de esta prestación." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send({
      error:
        "Ha ocurrido un error controlado al eliminar la relación entre prestación y beneficiario.",
      message: ex.message,
    });
  }
};

const addSucursalToPrestacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_prestacion } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({
          errors: "El parametro ID es requerido, el ID de la prestacion",
        });
    }

    const insertSucursalToSucursal = await PrestacionSucursal.create({
      id_prestacion: id_prestacion,
      id_sucursal: id,
    });

    if (insertSucursalToSucursal) {
      return res
        .status(200)
        .send({ message: "Sucursal agregados a la prestacion correctamente." });
    }
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }
};

const getPrestacionesToSucursal = async (req, res) => {
  
  try {
    const { id } = req.params;


    const getPrestacionToSucursal = await PrestacionSucursal.findAll({
      where: { 
        id_sucursal: id 
      },
      include: [ Prestacion ]
    });

    if (getPrestacionToSucursal) {
      return res
        .status(200)
        .send({ prestaciones: getPrestacionToSucursal});
    }
    
  } catch (ex) {
    console.error(ex);
    res
      .status(500)
      .send({ error: "Ha ocurrido un error.", message: ex.message });
  }

}


module.exports = {
  getAll,
  getOnePrestacion,
  editOne,
  createOne,
  deletePrestacion,
  activatePrestacion,
  getEtapas,
  createEtapa,
  asociateEtapa,
  updateEtapa,
  deleteAsociation,
  getAllBeneficiaryType,
  asociateTypeAndPrestacion,
  getTypes,
  deleteTypeAsociation,
  addSucursalToPrestacion,
  getPrestacionesToSucursal
};
