const {response} = require('express');
const {validationResult} = require('express-validator');


//el next se llama si todo el middleware se ejecuta correctamente
const validarCampos = (req, res = response, next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    next();
}

module.exports={
    validarCampos
}