//No se puede importar como en react, que digamos por ejemplo import express from 'express'
const express = require('express');
//el paquete cors o libreria sirve para poder proteger las rutas
const cors = require ('cors');
//el dotenv sirve para poder acceder los enviroment, osea los archivos que no se pueden
//acceder por cualquier usuario
require('dotenv').config();

const {dbConnection} = require('./database/config')

//Crear el servidor de express, una instancia para poder usar express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());


//Middleware, funcion que se ejecuta en el momento que alguien hace una peticion al servidor
//se ejecuta siempre que pasa por un lugar
//middleware se ejecuta antes de cualquier cosa


//declaracion para usar la carpeta public, esto sirve para el final, cuando se termina de usar react
//y se crea en npm run build
app.use(express.static('public'));


//Lectura y parseo del body, es importante que siempre este antes de las rutas
app.use( express.json());

//Rutas
//TODO: auth // crear, login, renew
//TODO: crud: Eventos
//se habilitan en donde estaran los edpoints
//todo lo que exporta routes/auth lo hace mediante el api
//se declaran las rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



/*app.get('/',(req, res)=>{
    console.log('se require el /')
});*/

//endpoint, peticiones que se van habilitar para que los usuarios donde sea que se encuentren
//puedan acceder a ella


//Escuchar peticiones
app.listen( process.env.PORT, () =>{
    //esta peticion se ejecuta cuando se levanta el servidor
    //Ejemplo de EMC6
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});