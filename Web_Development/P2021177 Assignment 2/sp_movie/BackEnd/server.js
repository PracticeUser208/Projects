// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

var app = require('./controller/app.js');
var serveStatic = require('serve-static');
var express = require('express');

var port = 8084;
app.use(serveStatic(__dirname + '/public'));

app.use(express.static("public"));

var server = app.listen(port, function () {
    console.log('Web App Hosted at http://localhost:%s', port);
});
