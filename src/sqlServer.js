const Connection = require("tedious").Connection;
const RequestTedious = require("tedious").Request;

//settings for SQL:
// en Sql Configuration Manager> start Sql Server Browser
// en Sql Server Network Configuration> Protocols for SQLEXPRESS> Enable TCP/IP
// restart SQL Server (SQLEXPRESS)
//https://www.microsoft.com/en-us/sql-server/developer-get-started/node/windows/step/2.html
// comando de prueba en powershell:
//sqlcmd -S localhost\SQLEXPRESS -U sa -Q "SELECT @@VERSION"
// sqlcmd -S DESKTOP-PS36VPJ\SQLEXPRESS -U sa -P Pabloman1_ -Q "Select * from dbo.test"
var TYPES = require("tedious").TYPES;
var async = require("async");

// Create connection to database
// view userCreation.sql script file o activar el user sa y permitir accesos mixtos
// el nombre del servidor de ajustarse cada vez que se cambie de laptop
// esta config funciona con SqlExpress
var config = {
  server: "localhost",
  authentication: {
    type: "default",
    options: {
      userName: "sa", // update me
      password: "Pabloman1_", // update me
    },
  },
  options: {
    //database: "master",
    instanceName: "SQLEXPRESS",
    trustServerCertificate: true,
  },
};

var connection = new Connection(config);

function Read(callback) {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  //const RequestTedious = require('tedious').Request;

  const request = new RequestTedious("SELECT @@VERSION;", function (
    err,
    rowCount,
    rows
  ) {
    if (err) {
      callback(err);
    } else {
      console.log(rowCount + " row(s) returned");
      callback(null);
    }
  });

  // Print the rows read
  var result = "";
  request.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
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
    throw err;
  } else {
    console.log("Done!");
  }
}

// Attempt to connect and execute queries if connection goes through
connection.on("connect", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
    async.waterfall([Read], Complete);
  }
});

module.exports = connection;
