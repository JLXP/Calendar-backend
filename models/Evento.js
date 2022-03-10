const {Schema,model} = require('mongoose');

const EventoSchema = Schema({
    title:{
        type: String,
        required:true,    
    },
    notes:{
        type: String,

    },
    start:{
        type: Date, 
        required:true
    },
    end:{
        type:Date,
        required: true
    },
    //Esto es una referencia hacia otra collection que se encuentra en la base de datos
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON', function(){
    const {__v,_id,...object}=this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema);