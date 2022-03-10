//esto se hace con el fin de poder utilizar nuevamente la herramienta o libreria json
const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');


const crearUsuario = async(req, res= response)=>{

    const { email, password }= req.body;

    try{

        //el await sirve para que primero se cumpla esta funcion y despues pasa a la siguiente
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo'
            });
        }
        //hacemos una instancia de usuario
        usuario = new Usuario(req.body);

        //Hay que encriptar la contraseña
        //mientras mas numeros de vuelta se le asigne mas dificil despues sera recuperarla
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        console.log(token);

        res.status(201).json({
            ok:true,
            msg:'Registro',
            uid: usuario.name,
            token
        });

    } catch(error){

        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    } 
}


const loginUsuario = async(req, res = response)=>{
    const { email, password }= req.body;

    try{

        //primero hace una busqueda para saber si existe el dato
        const usuario = await Usuario.findOne({email});

        //si no existe manda un error 400 de que no existe el dato
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'Los datos son incorrectos, por favor de verificar'
            });
        }

        //confirmar password
        //el compare es propio de librerias de react por lo cual solamente utiliza con el bcrypt
        const validPassword = bcrypt.compare( password, usuario.password );

        //Si el password no es valido manda un error 400 que esta mal ese dato
        if( !validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }

        //Se genera el json web token

        //Al ser una promesa tiene que esperar por medio de un await, primero se ejecuta el json web tokken
        //despues sigue todo lo despues
        const token = await generarJWT(usuario.id, usuario.name);
        console.log(token);

        res.status(201).json({
            ok:true,
            msg:'Login',
            uid: usuario.id,
            name: usuario.name,
            token
        });

        

    }catch(error){

        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    } 
}

//sirve para saber si el usuario es valido sino hacer que vuelva a loguearse
const revalidarToken = async(req, res)=>{

    const {uid,name} = req;

    const token = await generarJWT(uid, name);

    res.json({
        ok:true,
        token
    })
}

//es necesario hacer esto, no se puede hacer expor const usuario
module.exports ={
    crearUsuario,
    loginUsuario, 
    revalidarToken
}