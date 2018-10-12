'use strict';
var mongoose = require('mongoose');
var Nebenwirkungen = mongoose.model('Nebenwirkungen'); // Daten laden und als Variable deklarieren
var Wechselwirkungen = mongoose.model('Wechselwirkungen'); // Daten laden und als Variable deklarieren

exports.processRequest = function(req, res) {
if (req.body.result.action == "bot_ww") {
    getWW(req,res)
  }
  else if (req.body.result.action == "bot_nw")
  {
      getNW(req,res)
  }
};

function getNW(req,res)
{
let nwToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.nw ? req.body.result.parameters.nw : 'Unknown';
Nebenwirkungen.findOne({name:nwToSearch},function(err,nwExists)
      {
        if (err)
        {
          return res.json({
              speech: 'Etwas ist schiefgelaufen!',
              displayText: 'Etwas ist schiefgelaufen!',
              source: 'Nebenwirkungen'
          });
        }
if (nwExists)
        {
          return res.json({
                speech: nwExists.description,
                displayText: nwExists.description,
                source: 'Nebenwirkungen'
            });
        }
        else {
          return res.json({
                speech: 'Ich habe keine Nebenwirkungen in meiner Datenbank gefunden.',
                displayText: 'Ich habe keine Nebenwirkungen in meiner Datenbank gefunden.',
                source: 'Nebenwirkungen'
            });
        }
      });
}

function getWW(req,res)
{
let wwToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.ww ? req.body.result.parameters.ww : 'Unknown';
Wechselwirkungen.findOne({name:wwToSearch},function(err,wwExists)
      {
        if (err)
        {
          return res.json({
              speech: 'Etwas ist schiefgelaufen!',
              displayText: 'Etwas ist schiefgelaufen!',
              source: 'Wechselwirkungen'
          });
        }
if (wwExists)
        {
          return res.json({
                speech: wwExists.description,
                displayText: wwExists.description,
                source: 'Wechselwirkungen'
            });
        }
        else {
          return res.json({
                speech: 'Ich habe keine Wechselwirkungen in meiner Datenbank gefunden.',
                displayText: 'Ich habe keine Wechselwirkungen in meiner Datenbank gefunden.',
                source: 'Wechselwirkungen'
            });
        }
      });
}
