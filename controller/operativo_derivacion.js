const { OperativoDerivacion } = require("../models/operativo_derivacion");
const { Prestacion } = require("../models/prestacion");
const {Empresa} = require("../models/empresa");
const {Obra} = require("../models/obra");


const getAll = async (req, res) => {
    
    try{
        operativosDerivacionData = [];
        const operativosDerivacion = await OperativoDerivacion.findAndCountAll({ include: [Prestacion]});

        if (operativosDerivacion.rows.length < 1) {
          res.status(200).send({  message: "No se encontraron operativos derivacion." , operativosDerivacion: []});
        } else {
          res.status(200).send({  operativosDerivacion: operativosDerivacion });
        }

    }catch (ex) {
        console.error(ex);
            res
            .status(500)
            .send({ error: "Ha ocurrido un error módulo operativos derivacion.", message: ex.message });
    }

}


const createOneDerivacion = async (req, res) => {
    const {  
        empresa_id, 
        obra_id,
        trabajador_id,
        prestacion_id,
        asistente_social_id,
        gestor_id,
        asistente_operaciones_id} = req.body;

        try {

            const createOperacionDerivacion = await OperativoDerivacion.create({
                empresa_id: empresa_id, 
                obra_id: obra_id,
                trabajador_id: trabajador_id,
                prestacion_id: prestacion_id,
                asistente_social_id: asistente_social_id,
                gestor_id: gestor_id,
                asistente_operaciones_id: asistente_operaciones_id,
              });
          
              if (!createOperacionDerivacion) {
                res.status(500).send({ error: "Hubo un error al crear la operacion derivacion." });
              } else {
                res
                  .status(200)
                  .send({ message: "La operacion derivacion ha sido creado correctamente." });
              }
            
        } catch (ex) {
            console.error(ex);
            res.status(500).send({ error: "Ha ocurrido un error.", message: ex.message});
        }
}

const getOneDerivacion = async (req, res) => {
    
    const { id } = req.params;

    try {
        const operativosDerivacion = await OperativoDerivacion.findByPk(id, { include: [Prestacion]});

        const empresaObject = await Empresa.findByPk(operativosDerivacion.empresa_id);
        const obraObject = await Obra.findByPk(operativosDerivacion.obra_id);
    
        if (operativosDerivacion.length < 1) {
          res.status(200).send({ message: "No se ha encontrado la operacion derivacion.", operativosDerivacion: [], empresa: [], obra: [],});
        } else {
          res.status(200).send({ operativosDerivacion: operativosDerivacion, empresa: empresaObject, obra: obraObject });
        }
      } catch (ex) {
        console.error(ex);
        res.status(500).send({ error: "Ha ocurrido un error en el modulo de operacion derivacion.", message: ex.message });
      }

}

const editOneDerivacion = async (req, res) => {

    const { 
        empresa_id, 
        obra_id,
        fecha_solicitud,
        trabajador_id,
        prestacion_id,
        asistente_social_id,
        gestor_id,
        asistente_operaciones_id } = req.body;

    const { id } = req.params;
    
    const updateDate = new Date();

    try {

        const updateOneDerivacion = await OperativoDerivacion.update(
        {
                empresa_id: empresa_id, 
                obra_id: obra_id,
                trabajador_id: trabajador_id,
                fecha_solicitud: fecha_solicitud,
                prestacion_id: prestacion_id,
                asistente_social_id: asistente_social_id,
                gestor_id: gestor_id,
                asistente_operaciones_id: asistente_operaciones_id,
                fecha_actualizacion: updateDate
        }, { where: { id: id } }
        );

        if (!updateOneDerivacion) {
        res.status(404).send({ message: "No se encontró la operacion derivacion.." });
        } else {
        res
            .status(200)
            .send({ message: "Operacion derivacion actualizada correctamente." });
        }
    } catch (ex) {
        console.error(ex);
        res.status(500).send({ error: "Ha ocurrido un error en el modulo de la operacion derivacion.", message: ex.message});
    }

}

const cancelOneDerivacion = async (req, res) => {

      const { id } = req.params;
      
      const updateDate = new Date();

      try {

        const cancelOneDerivacion = await OperativoDerivacion.update(
        {
            status: false,
            fecha_actualizacion: updateDate
        }, { where: { id: id } }
        );

        if (!cancelOneDerivacion) {
        res.status(404).send({ message: "No se encontró la operacion derivacion.." });
        } else {
        res
            .status(200)
            .send({ message: "Operacion derivacion cancelado correctamente." });
        }
    } catch (ex) {
        console.error(ex);
        res.status(500).send({ error: "Ha ocurrido un error en el modulo de la operacion derivacion.", message: ex.message});
    }
}


module.exports = {getAll, createOneDerivacion, getOneDerivacion, editOneDerivacion, cancelOneDerivacion};