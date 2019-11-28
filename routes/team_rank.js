var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('team_rank', {
        title: 'DAQ Basketball prediction'
    });
});

module.exports = router;
