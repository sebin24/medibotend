'use strict';
var mongoose = require('mongoose');
var Nebenwirkungen = mongoose.model('Nebenwirkungen'); // Daten laden und als Variable deklarieren
var Wechselwirkungen = mongoose.model('Wechselwirkungen'); // Daten laden und als Variable deklarieren
var Warnung = "Mithilfe dieser Datenbank können Sie sich über Arzneimittel und deren Wechselwirkungen informieren. Die medizinische Wissenschaft entwickelt sich ständig weiter. Neue Informationen finden nur mit zeitlicher Verzögerung Eingang in diese Datenbank. Lesen Sie daher immer die aktuelle Gebrauchsinformation, die Ihrem Medikament beiliegt, vollständig durch und fragen Sie Ihren Arzt oder Apotheker. Die Informationen dieser Datenbank sind nicht vollständig. Nicht jede Information ist für jeden Patienten relevant. Die Datenbank ersetzt daher nicht den Arztbesuch und nicht die Beratung durch den Apotheker."

exports.processRequest = function(req, res) { //unterscheidung welche Aktion gebraucht wird
  if (req.body.queryResult.action == "bot_ww") {
    getWW(req,res)
  }
  else if (req.body.queryResult.action == "bot_nw")
  {
      getNW(req,res)
  }
};

function getNW(req,res) // Nebenwirkungen in der DB suchen
{
  let nwToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.Medikamente_Stoffe ? req.body.queryResult.parameters.Medikamente_Stoffe : 'Unknown';
  Nebenwirkungen.findOne({name:nwToSearch},function(err,result){
    if (err){
        return res.json({
          "fulfillmentText": "Irgendetwas ist scheif gelaufen."
        });
    }
    if (result){
      return res.json({
        "fulfillmentText": result.description+"\n\n"+ Warnung
      });
    }

    else {
      return res.json({
        "fulfillmentText": "Ich habe keine Nebenwirkungen zu "+req.body.queryResult.parameters.Medikamente_Stoffe+
        " in meiner Datenbank gefunden."+"\n\n" + Warnung
      });
    }
  });

}

function getWW(req,res) //Wechselwirkungen in der DB suchen (in der entwicklung)
{
  let wwToSearch = req.body.queryResult.parameters.Medikamente_Stoffe + "und" +req.body.queryResult.parameters.Medikamente_Stoffe1 || req.body.queryResult.parameters.Medikamente_Stoffe1 + "und" +req.body.queryResult.parameters.Medikamente_Stoffe;
  Wechselwirkungen.findOne({name: wwToSearch}, function(err,result){
    if (err){
        return res.json({
          "fulfillmentText": "Irgendetwas ist schief gelaufen.",
        });
    }
    else if (result){
      return res.json({
        "fulfillmentText": result.description +"\n\n"+ Warnung
      });
    }
    else {
      return res.json({
        "fulfillmentText": "Ich habe keine Wechselwirkungen zu "+req.body.queryResult.parameters.Medikamente_Stoffe+"und"+req.body.queryResult.parameters.Medikamente_Stoffe1+
        " in meiner Datenbank gefunden."+ "\n\n" + Warnung
      });
    }
  });


}
