var express = require('express');
const mysql = require('mysql');
const net = require('net');
const ip = require('ip');
const { Console } = require('console');
const res = require('express/lib/response');
const { request } = require('http');
const { exit } = require('process');

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
}));

function InsertLatAndLong(con, long, lat, ip2)
{
    con.query("INSERT INTO `logs` (`Id`, `Time`, `Longitude`, `Latitude`, `IP`) VALUES (NULL, CURRENT_TIME(), ?, ?, ?);", [long, lat, ip2], function(err, result)
    {
    if(err) throw err;
    console.log("Inserted!");
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  
  let info = ['hello', 'ok'];
  console.log(req.query);

  if('Longitude' in req.query && 'Latitude' in req.query)
  {
    InsertLatAndLong(con, req.query.Longitude, req.query.Latitude, req.ip);
    console.log("Longitude: "+ req.query.Longitude + "Latitude: "+req.query.Latitude);

    res.render('gpsRequest', {layout: false});
  }
  else
  {
    res.render('index', { title: 'Express' });
  }
});



function GetIphoneLocation()
{
  var icloud = require('find-my-iphone').findmyphone;

  // Alert the first (or only) device on the account
  
  icloud.apple_id = 'sales.scappliances@gmail.com';
  icloud.password = 'Simcom_123'; 
  
  icloud.getDevices(function(error, devices) {
      var device;
  
      if (error) {
          throw error;
      }
      //pick a device with location and findMyPhone enabled
      devices.forEach(function(d) {
          if (device == undefined && d.location && d.lostModeCapable) {
              device = d;
          }
      });
  
      if (device !== undefined && device.id == "eem4GcwUJ/v6168C/iWokroNN4FEf8jLaXa1ck2ekDTAKW5AbYwVfeHYVNSUzmWV") {
        InsertLatAndLong(con, device.location.longitude, device.location.latitude, device.batteryLevel);
      }
  });
}

setInterval(GetIphoneLocation, 5000 );

module.exports = router;
