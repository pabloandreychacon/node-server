"use strict";

var Connection = require('tedious').Connection;
const RequestTedious = require('tedious').Request;

const express = require('express');
const morgan = require('morgan');

//https://www.microsoft.com/en-us/sql-server/developer-get-started/node/windows/step/2.html
// comando de prueba en powershell:
// sqlcmd -S DESKTOP-PS36VPJ\SQLEXPRESS -U sigacUser -P Pabloman1_ -Q "Select * from dbo.test"
var TYPES = require('tedious').TYPES;
var async = require('async');

const app = express();
// Create connection to database
var config = {
    server: 'DESKTOP-PS36VPJ',
    authentication: {
        type: 'default',
        options: {
            userName: 'sigacUser', // update me
            password: 'Pabloman1_' // update me
        }
    },
    options: {
        //database: 'sigac-tests',
        instanceName: 'SQLEXPRESS',
        trustServerCertificate: true
    }
};

var connection = new Connection(config);

function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    //const RequestTedious = require('tedious').Request;

    const request = new RequestTedious(
        'SELECT * FROM dbo.test;',
        function(err, rowCount, rows) {
            if (err) {
                callback(err);
            } else {
                console.log(rowCount + ' row(s) returned');
                callback(null);
            }
        });

    // Print the rows read
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    // Execute SQL statement
    connection.execSql(request);
}

function Complete(err, result) {
    if (err) {
        throw (err);
    } else {
        console.log("Done!");
    }
}

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
        async.waterfall([
            Read
        ], Complete);
    }
});
//settings express
app.set('AppName', 'Test Node plus Express');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); // views templatre engine

// middlewares
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

app.get('/views/', (req, res) => {
    const data = [{
            "name": "Andrey",
            "lastName": "Chacon"
        },
        {
            "name": "Jean",
            "lastName": "Chacon"
        },
    ];
    res.render('index.ejs', { people: data });
});

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
//si no existe la ruta / entonces se va a public
// en navegador: localhost:port/
app.use(express.static('public'))

app.listen(app.get('port'), () => {
    console.log(app.get('AppName'));
    console.log('Server on port 3001');
})