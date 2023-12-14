const express = require("express");
const router = express.Router();
const {UNAUTHORIZED} = require("./constans")

/*
1- en vez express.urlencoded({ extended: false }) uso express.json() ya que no es un formulario codificado en formato URL
*/

router.post("/login", express.json(), (req, res) => {
  // Validar los datos que se envían por POST
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    res.status(UNAUTHORIZED).send("Inicio de sesión fallida");
  }
  req.session.regenerate(function (err) {
    if (err) next(err);

    // Almacena el usuario en la sesión
    req.session.nombre = req.body.nombre;

    // Guarda la sesión y redirecciona
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect("/");
    });
  });
});

// ruta para salir del login
router.get("/logout", (req, res) => {
  req.session.nombre = null;
  req.session.save(function (err) {
    if (err) next(err);

    /* regenerar la sesión, lo que es una buena práctica para ayudar a
     evitar formas de fijación de sesión*/
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
});

// ruta para obtener el nombre del usuario al iniciar sesion
router.get("/", (req, res) => {
  const nombre = req.session.nombre;

  if (nombre) {
    res.send(`Hola, ${nombre}`);
  } else {
    res.send("Por favor inicie sesion");
  }
});

module.exports = router;
