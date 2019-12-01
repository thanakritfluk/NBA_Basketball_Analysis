var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');

// var allTeam =  function() {
//     const nba_team = [];
//     const sql = `SELECT DISTINCT team_name FROM standing;`;
//     db.query(
//         sql,
//         (err, res) => {
//           nba_team.push(res);
//           console.log(nba_team);
//         }
//     ).catch(err => console.log(err));      
// }
var team = [];
var allTeam = function () {
    var promise = new Promise(function (resolve, reject) {
      var jsonStr;
      db.query(`SELECT team_name, rank, year, conference FROM standing ORDER BY team_name;`,function(err, result){
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


/* GET home page. */
// router.get('/', function (req, res, next) {
//     allTeam();
//     res.render('team_rank', {
//         title: 'DAQ Basketball prediction'
//     });
// });

router.get('/', function(req, res, next) {
    allTeam()
    .then(function success(result) {
       res.render('team_rank',  {             
            title: 'DAQ Basketball prediction',    
            team_name: team,
            result: JSON.stringify(result)            
        });
    })
});


module.exports = router;

