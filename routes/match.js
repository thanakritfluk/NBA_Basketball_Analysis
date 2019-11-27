var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('match', {
        title: 'DAQ Basketball prediction'
    });
});

router.get('/all', getAllAdmin);

function getAllAdmin(req, res, next) {
    db.query('SELECT * FROM admins')
      .then(({ rows }) => res.json(rows))
      .catch(next);
}


module.exports = router;
