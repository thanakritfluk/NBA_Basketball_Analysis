var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');

var team = [];
var allTeam = function () {
    var promise = new Promise(function (resolve, reject) {
      var jsonStr;
      db.query(`SELECT team_name, w_score, rank FROM standing ORDER BY team_name, year ASC;`,function(err, result){
        if(err) {
          reject(err);
        } else {
          jsonStr = result.rows;
          for(var i = 0; i < jsonStr.length; i++) {
              team.push(jsonStr[i].team_name);              
          }          
          resolve(jsonStr);         
        }
      });      
    });
    return promise;
};


router.get('/', function(req, res, next) {
    allTeam()
    .then(function success(result) {
       res.render('match',  {             
            title: 'DAQ Basketball prediction',    
            team_name: team,
            result: JSON.stringify(result)            
        });
    })
});


module.exports = router;
