'use strict';

var express = require('express');

var router = express.Router();

router.get(
  '/',
  function(req, res, next) {
    res.json({test: 'test'});
  }
);

module.exports = router;