const {Trabajador} = require("../models/trabajador");
const {Empresa} = require("../models/empresa");
const {Obra} = require("../models/obra");


const getAll = async (req, res) => {

    const { page, limit, search } = req.query;

    try {
        const trabajadorAll = await Trabajador.findAndCountAll({
            where: {
                nombres_trabajador: {
                    [Op.like]: `%${search}%`,
                },
            },
            limit: limit,
            offset: page,
        });

        if (trabajadorAll.rows.length < 1) {
            res
                .status(200)
                .send({ message: "No se encontraron trabajadores.", trabajadores: [] });
        } else {
            res.status(200).send({ trabajadores: trabajadorAll });
        }
    } catch (ex) {
        console.error(ex);
        res.status(500).send({
            error: "Ha ocurrido un error módulo trabajadores.",
            message: ex.message,
        });
    }
};

const createOneTrabajador = async (req, res) => {


    const {
        nombres_trabajador,
        apellidos_trabajador,
        rut_trabajador,
        fecha_nacimiento,
        sexo,
        empresa_id,
        obra_id
    } = req.body;

    const getDataBusiness = await Empresa.findByPk(empresa_id);
    const empresa = getDataBusiness;

    const getDataObra = await Obra.findByPk(obra_id);
    const obra = getDataBusiness;

    if (!empresa) {
        res.status(200).send({ message: `No se encontro empresa asociado al ID: ${empresa_id}` });
        return;
    }

    if (!obra) {
        res.status(200).send({ message: `No se encontro obra asociado al ID: ${obra_id}` });
        return;
    }

    try {
        const insertTrabajadorValue = await Trabajador.create({
            nombres_trabajador: nombres_trabajador,
            apellidos_trabajador: apellidos_trabajador,
            rut_trabajador: rut_trabajador,
            fecha_nacimiento: fecha_nacimiento,
            sexo: sexo,
            nombre_empresa: empresa.business_name,
            rut_empresa: empresa.rut_empresa,
            empresa_id: empresa_id,
            nombre_obra: obra.name,
            obra_id: obra_id
        });

        if (!insertTrabajadorValue) {
            res
                .status(500)
                .send({ message: "Ha ocurrido un error al crear el trabajador." });
        } else {

            res.status(200).send({ message: "Trabajador creado correctamente." });
        }
    } catch (ex) {
        console.error(ex);
        res.status(500).send({ error: "Ha ocurrido un error.", message: ex.message });
    }
};

module.exports = { getAll, createOneTrabajador };