/*
express.Router
==============

Cada aplicación Express tiene un enrutador de aplicación incorporado.

Utilice la clase express.Router para crear manejadores de rutas montables y modulares. 
Una instancia Router es un sistema de middleware y direccionamiento completo; por este 
motivo, a menudo se conoce como una “miniaplicación”.

El siguiente ejemplo crea un direccionador como un módulo, carga una función de middleware 
en él, define algunas rutas y monta el módulo de direccionador en una vía de acceso en la 
aplicación principal.
*/

//Vamos a requerir una funcionalidad de Express
// const express = require("express"); //--> Otra forma de hacerlo
// const router = express.Router();    //--> Otra forma de hacerlo
const router = require("express").Router(); //Requerimos express para crear Rutas //.Router(): Este método nos permite definir un objeto con multiples rutas

router.get("/", (req, res) => { //Cuando te piden una petición a la ruta inicial de la aplicación, vamos a responder o vamos a menejar esa petición a traves de un manejador de peticiones o atraves de una function.
    // res.send("Hellow World!");
    res.render('index')
})

module.exports = router;



// //routes
// module.exports = (app) => {
//     app.get("/", (req, res) => { //Cuando te piden una petición a la ruta inicial de la aplicación, vamos a responder o vamos a menejar esa petición a traves de un manejador de peticiones o atraves de una function.
//         // res.send("Hellow World!");
//         res.render('index')
//     })
// }