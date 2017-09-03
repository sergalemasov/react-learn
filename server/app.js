'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var apiRoutes = require('./routes/api.routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  if (req.app.get('env') === 'development') {
    res.json({
      error: {
        status: err.status,
        message: err.message,
        stackTraceList: (function(stack) {
          if (stack) {
            return stack.split('\n').map(function (stackLine) {
              return stackLine.trim();
            });
          }
        })(err.stack)
      }
    });
  } else {
    res.end();
  }
});

module.exports = app;