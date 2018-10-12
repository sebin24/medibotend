'use strict';
var express = require('express'); //Laden und deklarieren von "express"
module.exports = function(app) { // export der funktion zu index.js
  var WechselwirkungController = require('../Controllers/WirkungenController');
  var apiRoutes =  express.Router();
  app.get('/',function(req,res){ // bei Seiten aufruf ohne JSON-Datei/Anfangsnachricht
    res.send('Webhook für die Wirkungen aktiv!');
  });

  app.route('/') // ansonsten WechselwirkungController ausführen
    .post(WechselwirkungController.processRequest);
};
