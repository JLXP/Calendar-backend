/*
    Rutas de Usuarios / Auth
    host + api/auth

*/

const {Router} = require('express');
const {check} =require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');



//Nuevo Usuario
router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],//coleccion de middleware
    crearUsuario );

//para iniciar sesion es necesario realizar un post con la informacion
router.post(
    '/',
    [
        check('email', ' el email es obligatorio').isEmail(),
        check('password','El password debe contener más de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario);

//sirve para poder revalidar token
router.get('/renew',validarJWT, revalidarToken );

module.exports = router;