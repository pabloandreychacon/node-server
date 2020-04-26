const express = require('express');
const morgan = require('morgan');
const app = express();

//middleware para todas propio
function logger(req, res, next) {
    console.log(`Middleware Request Received: 
    ${req.protocol}://
    ${req.get('host')}
    ${req.originalUrl}`);
    next();
}

//middleware para poder leer json
app.use(express.json());
app.use(morgan('dev')); // otro logger
app.use(logger);
// routes

// middleware, para todas las rutas /user
app.all('/user', (req, res, next) => {
    console.log("Ruta /user capturada");
    next(); // va a la ruta que le corresponde
});

//app.get('/', (req, res) => {
  //  res.send('hello node');
//});
app.get('/user', (req, res) => {
        res.json({
        "username": "Andrey",
        "password": "12345"   
    });
});
app.get('/about', (req, res) => {
    res.send('hello about');
});
app.get('/contact', (req, res) => {
    res.send('hello contact');
});
app.post('/post', (req, res) => {
    res.send('hello post');
});
app.put('/put', (req, res) => {
    res.send('hello put');
});
app.delete('/delete', (req, res) => {
    res.send('hello delete');
});

// en postman:
// localhost:port/newUser
// header: Content-Type: application/json
//body>raw: { "username": "test","lastname": "xyz"}
app.post('/newUser', (req, res) => {
    console.log(req.body);
    res.send("Post request received");
});
// en postman: post
// localhost:port/newUser/435
// header: Content-Type: application/json
//body>raw: { "username": "test","lastname": "xyz"}
app.post('/newUser/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send("Post request received");
});
// en postman: delete
// localhost:port/deleteUser/435
// header: Content-Type: application/json
//body>raw: { "username": "test","lastname": "xyz"}
app.delete('/deleteUser/:userId', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send(`User ${req.params.userId} deleted`);
});
// en postman: put
// localhost:port/updateUser/435
// header: Content-Type: application/json
//body>raw: { "username": "test","lastname": "xyz"}
app.put('/updateUser/:userId', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send(`User ${req.params.userId} updated`);
});

//middleware para enviar static files
// en navegador: localhost:port/
app.use(express.static('public'))

app.listen(3001, ()=> {
    console.log('Server on port 3001')
})
