var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('match', {
        title: 'DAQ Basketball prediction'
    });
});


module.exports = router;
