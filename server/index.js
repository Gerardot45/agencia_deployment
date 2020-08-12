const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const routes = require("./routes");
const configs = require('./config')

require("dotenv").config({ path: "variables.env" });

//configurar express
const app = express();

//habilitar pub
app.set("view engine", "pug");

//añadir las vistas
app.set("views", path.join(__dirname, "./views"));

//cargar la carpeta estática
app.use(express.static("public"));

//validar si estamos en desarrollo o en producción
const config = configs[app.get('env')]

//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio

//muestra el año actual
app.use((req, res, next) => {
  const fecha = new Date();
  res.locals.fechaActual = fecha.getFullYear(); 
  res.locals.ruta = req.path;
  return next();
});

//ejecutamos el body-parser
app.use(bodyParser.urlencoded({extended:true}))

//cargar rutas
app.use("/", routes());
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
app.listen(port,host,() => {
  console.log(`El servidor funciona`)
});
