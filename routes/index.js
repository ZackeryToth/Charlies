var express = require('express');
const mysql = require('mysql');
const net = require('net');
const ip = require('ip');
const { Console } = require('console');
const client = net.connect({port: 80, host:"google.com"}, () => {
  console.log(client.address());
  console.log('MyIP='+client.localAddress);
  console.log('MyPORT='+client.localPort);
});

var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gpslogger"
});


if(con.connect(function(err){
  if(err) throw err;
  console.log('connected!');

  con.query("INSERT INTO `logs` (`Id`, `Time`, `Longitude`, `Latitude`) VALUES (NULL, CURRENT_TIME(), ?, ?);", ['hello', 'there'], function(err, result)
{
  if(err) throw err;
  console.log("Inserted!");
})
}));

con.create




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
