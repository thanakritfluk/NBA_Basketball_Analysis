var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('topten_conference', {
      title: 'DAQ Basketball prediction'
  });
});


module.exports = router;
