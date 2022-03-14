const {response} = require('express');
//este validation result es parte de el express validator y detecta si algun check no esta funcionando
const {validationResult} = require('express-validator');


//el next se llama si todo el middleware se ejecuta correctamente
const validarCampos = (req, res = response, next)=>{

    const errors = validationResult(req);
    /* Aqui pregunta si error esta vacio,
    si el error tiene algo entonces ejecuta el error 400
    */
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            // el error maped es lo que valida del check
            errors:errors.mapped()
        });
    }

    next();
}

module.exports={
    validarCampos
}