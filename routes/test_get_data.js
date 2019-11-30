var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');


router.get('/', getAllAdmin);

function getAllAdmin(req, res, next) {
    db.query(`
      SELECT * FROM standing
      `)
      .then(({ rows }) => res.send(rows))
      .catch(next);
}


module.exports = router;