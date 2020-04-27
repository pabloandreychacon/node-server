"use strict";

const express = require("express");
const morgan = require("morgan");

const routes = require("./routes");
const routesApi = require("./routesApi");
const SqlConnectionTest = require("./sqlServer");

const app = express();

//settings express
app.set("AppName", "Test Node plus Express");
app.set("port", process.env.PORT || 3001);
app.set("view engine", "ejs"); // views template engine
app.set("views", __dirname + "\\views");
console.log("dirname: ", __dirname);
console.log("Views folder from settings:", app.get("views"));

// middlewares
//middleware propio para todas las rutas
function logger(req, res, next) {
  console.log(`Middleware Request Received: 
    ${req.protocol}://
    ${req.get("host")}
    ${req.originalUrl}`);
  next();
}
//middleware para po   der leer json
app.use(express.json());
app.use(morgan("dev")); // otro logger
app.use(logger); // logger propio

// routes
app.use(routes);
app.use("/api", routesApi);

app.get("*", (req, res) => {
  // aqui debería enviar a 404.html view template
  res.send("Archivo no econtrado");
});
//middleware para enviar static files
//si no existe la ruta / entonces se va a public
// en navegador: localhost:port/
app.use(express.static("public"));

app.listen(app.get("port"), () => {
  console.log("AppName from settings:", app.get("AppName"));
  console.log("Server on port:", app.get("port"));
});
