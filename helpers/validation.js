const { check } = require('express-validator');

const validateTeamCreate = [
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('region', 'La region es requerida').not().isEmpty(),
    check('comuna', 'La comuna es requerida').not().isEmpty(),
    check('sucursal', 'La sucursal es requerida').not().isEmpty(),
    check('id_prestador', 'El id_prestador es requerida').not().isEmpty()
];

const validateGetTeams = [
    check('id_prestador', 'El id prestador requerido').not().isEmpty(),
];

const validateAddPersonalFromTeams = [
    check('integrantes', 'Es requerido que ingrese integrantes').not().isEmpty().toArray(),

    check("integrantes.*.rut", 'El rut del integrante es requerido').not().isEmpty(),
    check("integrantes.*.nombres", 'El nombre del integrante es requerido').not().isEmpty(),
    check("integrantes.*.apellidos", 'El apellido del integrante es requerido').not().isEmpty(),
    check('integrantes.*.prestaciones', 'Es requerido que ingrese integrantes').not().isEmpty().toArray(),
    check('integrantes.*.prestaciones.*.id_prestacion', 'es requerido ingresar el id de la prestacion').not().isEmpty()
];

const validateEditPersonalFromTeams = [
    check("rut", 'El rut del integrante es requerido').not().isEmpty(),
    check("nombres", 'El nombre del integrante es requerido').not().isEmpty(),
    check("apellidos", 'El apellido del integrante es requerido').not().isEmpty(),
    check('prestaciones', 'Es requerido que ingrese integrantes').not().isEmpty().toArray(),
    check('prestaciones.*.id_prestacion', 'es requerido ingresar el id de la prestacion').not().isEmpty()
];

const validateTeamEdit = [
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('region', 'La region es requerida').not().isEmpty(),
    check('comuna', 'La comuna es requerida').not().isEmpty(),
    check('sucursal', 'La sucursal es requerida').not().isEmpty(),
    check('id_prestador', 'El id_prestador es requerida').not().isEmpty()
];

const validateTeamDelete = [
    check('id', 'ID es requerido').not().isEmpty(),
];

const validateDeletePersonalWithTeam = [
    check('id_integrante', 'ID integrante es requerido').not().isEmpty(),
];

module.exports = {validateTeamCreate, validateGetTeams, validateTeamEdit, validateTeamDelete, validateAddPersonalFromTeams, validateDeletePersonalWithTeam, validateEditPersonalFromTeams};