const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) =>{ 
    //retornar una promesa para que espere que se realice esto y despues seguir con lo demas
    return new Promise((resolve, reject) =>{
        const payload = { uid, name};
        //Firma el jsonweb token
        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        },(error, token)=>{            
            if(error){
                reject('No se pudo generar el Token');
            }

            resolve( token );
        });
    })
}

module.exports = {
    generarJWT
}