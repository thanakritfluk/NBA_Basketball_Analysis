var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');

const current_year =  parseInt(new Date().getFullYear());

/* GET home page. */
var getDashboard = function () {
    var promise = new Promise(function (resolve, reject) {
      var jsonStr;
      db.query(`SELECT * FROM standing ORDER BY year DESC, pct_score DESC;`,function(err, result){
        if(err) {
          reject(err);
        } else {
          jsonStr = result.rows;
          resolve(jsonStr);
        }
      });      
    });
    return promise;
};

router.get('/', function(req, res, next) {
    getDashboard()
    .then(function success(result) {
       res.render('data',  {             
            file: JSON.stringify(result),                     
        });
    })
});


module.exports = router;
