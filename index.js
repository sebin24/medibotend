'use strict';
var express  = require('express'), //Laden und deklarieren von "express"
bodyParser   = require('body-parser'), //"body-parser" für die JSON-Dateien in der DB
http         = require('http'), // "http" um http server zu benutzen
config       = require('./config'), //"Laden des Links inder Datei config.js"
online       = express(), // funktion "express" zur erstellung des server als online deklarieren
mongoose     = require('mongoose'), // schnittstelle zu MongoDB
Nebenwirkungen     = require('./API/Models/Nebenwirkungen'), //modelle bzw. Datenobjekte
Wechselwirkungen = require('./API/Models/Wechselwirkungen');//als variable deklarieren
const PORT = process.env.PORT || 5000 // Port definieren
mongoose.Promise = global.Promise; //Promise deklarieren -> Ergebnis einer asynchronen operation
mongoose.connect(config.dbUrl); // verbindung zur Datenbank
online.use(bodyParser.urlencoded({ extended: true })); //Parser um
online.use(bodyParser.json());//                         JSON-Datei zu lesen
var routes = require('./API/Routes/Routes'); //importieren von route
routes(online); //registrieren von route
online.listen(PORT, () => console.log(`Listening on ${ PORT }`)) // benutzter port und bestätigungs Nachricht
;
