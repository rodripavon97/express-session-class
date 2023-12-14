const express = require("express");
const session = require("express-session");
const {DAY} = require("./constans")

const router = require("./router");
const app = express();


app.use(
  session({
    secret: "session-example-test", //Clave secreta para encriptar las sesiones
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: DAY, // duracion de la cookie
    },
  })
);

//aqui defino las rutas
app.use(router)

//indico a que puerto quiero llamar
app.listen(3000, ()=> {
    console.log("estoy navegando en el puerto 3000")
});
