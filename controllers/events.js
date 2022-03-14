
const { response } = require('express'); 
const Evento = require('../models/Evento');

const getEventos= async(req,res= response)=>{

    //el populate sirve para hacer referencia a otra collection de la base de datos
    //yo elijo que datos quiero traer, el id de por si lo trae siempre
    //en este caso le digo que me traiga el name
    const eventos = await Evento.find()
    .populate('user','name');

    res.json({
        ok:true,
        eventos
    })
}


const crearEvento= async(req,res= response)=>{

    //instancia del nuevo modelo
    const evento= new Evento(req.body);

    try{
        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok:true,
            evento:eventoGuardado
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

    //verificar que tenga el evento
}

//La diferencia entre el create y el update es la siguiente
//en el post estoy enviando datos
//En el actualizar estoy recibiendo datos
const actualizarEvento= async(req,res= response)=>{

    //con el req puedo obtener el id u otra informacion que se envia
    //el req. params lo toma desde la url por ello el params
    const eventoId = req.params.id;
    //este no se extrae, se envia
    const uid = req.uid;

    try{
        const evento = await Evento.findById(eventoId);

        if(!evento){
            //El error 404 es para informar que no existe el usuario u alguna busqueda de la base de datos
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            });
        }

        /*esta validacion hace lo siguiente, si el usuario que esta logueado quiere eliminar oeditar alguna nota que 
            no el escribio saltara el siguiente error
        */
        if( evento.user.toString()!== uid ){
            // El error 401 es para cuando no esta autorizado en hacer algo
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios de editar este evento'
            })
        }

        //nueva Data
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento);

        res.json({
            ok:true,
            evento:eventoActualizado
        });

    }catch(error){
        
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async(req, res=response)=>{

 //con el req puedo obtener el id u otra informacion que se envia
    const eventoId = req.params.id;
    const uid = req.uid;

    try{
        const evento = await Evento.findById(eventoId);

        if(!evento){
            //El error 404 es para informar que no existe el usuario u alguna busqueda de la base de datos
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            });
        }
        /*esta validacion hace lo siguiente, si el usuario que esta logueado quiere eliminar oeditar alguna nota que 
            no el escribio saltara el siguiente error
        */       
        if( evento.user.toString()!== uid){
            // El error 401 es para cuando no esta autorizado en hacer algo
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios de eliminar este evento'
            })
        }
        const eventoEliminar = await Evento.findByIdAndDelete(eventoId);
        res.json({
            ok:true,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
    
}

module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}