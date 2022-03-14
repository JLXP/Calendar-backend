/* 
    Event Routes
    /api/events


*/

//Todos tienen que pasa por la validacion del JWT
//Obtener eventos

const {Router} = require('express');
const { check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
//Todas las rutas tienen que estar validadas por el jsonwebtoken
const {validarJWT} = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
//esto sirve para guardar la fecha correcta
const { isDate } = require('../helpers/isDate');
const router = Router();

//Con hacer esto le digo que cualquiera que todas las rutas que se encuentren aqui primero tiene que ser
//validados por un token
router.use(validarJWT);


router.get('/', getEventos);

router.post('/',
    [
        check('title','El titulo es obliatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

router.put('/:id',
    [
        check('title','El titulo es obliatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;

