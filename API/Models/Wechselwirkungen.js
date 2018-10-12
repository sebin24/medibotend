var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Schema definieren, Ausehen der Dateien
var Wechselwirkungen = new Schema({ // in der Datenbank richtig importieren und verwenden
name:{
 type:String,
 required:false
},
description:{
 type:String,
 required:false
}
});
module.exports = mongoose.model('Wechselwirkungen', Wechselwirkungen); // Datenpaket exportieren
