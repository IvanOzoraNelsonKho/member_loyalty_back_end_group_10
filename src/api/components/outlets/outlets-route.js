const express = require('express');
const outletsController = require('./outlets-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/outlets', route);

  route.get('/', outletsController.getOutlets);

  route.post('/', outletsController.createOutlet);
};
