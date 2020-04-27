const express = require("express");
const routerApi = express.Router();

// middleware, para todas las rutas /user
routerApi.all("/user", (req, res, next) => {
  console.log("Ruta /user capturada");
  next(); // va a la ruta que le corresponde
});

//routerApi.get('/', (req, res) => {
//  res.send('hello node');
//});
routerApi.get("/user", (req, res) => {
  res.json({
    username: "Andrey",
    password: "12345",
  });
});
// en postman:
// localhost:port/newUser
// header: Content-Type: application/json
//body>raw: { "username": "test","lastname": "xyz"}
routerApi.post("/newUser", (req, res) => {
  console.log(req.body);
  res.send("Post request received");
});
// en postman: post
// localhost:port/newUser/435
// header: Content-Type: application/json
//body>raw: { "username": "test","lastname": "xyz"}
routerApi.post("/newUser/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send("Post request received");
});
// en postman: delete
// localhost:port/deleteUser/435
// header: Content-Type: application/json
//body>raw: { "username": "test","lastname": "xyz"}
routerApi.delete("/deleteUser/:userId", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send(`User ${req.params.userId} deleted`);
});
// en postman: put
// localhost:port/updateUser/435
// header: Content-Type: application/json
//body>raw: { "username": "test","lastname": "xyz"}
routerApi.put("/updateUser/:userId", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send(`User ${req.params.userId} updated`);
});

module.exports = routerApi;
