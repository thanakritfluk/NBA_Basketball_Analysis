var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('topten_league', {
        title: 'DAQ Basketball prediction'
    });
});
module.exports = router;




