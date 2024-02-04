var express = require('express');
var router = express.Router();
var generateLog = require('../lib/logs');

router.post('/', function(req, res, next) {
  var {product} = req.body;

  if (!product) {
    res.send({error: '\'product\' is required'});
    return;
  }

  try {
    console.log(generateLog('Success', 'Image Generator (Trained)', product));
    res.send({image: 'test'});
  } catch (error) {
    console.log(generateLog('Error', 'Image Generator (Trained)', product));
    res.send(error);
  }
});

module.exports = router;
