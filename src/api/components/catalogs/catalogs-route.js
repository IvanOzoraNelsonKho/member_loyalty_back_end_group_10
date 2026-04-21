const express = require('express');
const catalogsController = require('./catalogs-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/catalogs', route);

  route.get('/', catalogsController.getCatalogs);
  route.post('/', catalogsController.createCatalog);
  route.get('/:id', catalogsController.getCatalog);
  route.put('/:id', catalogsController.updateCatalog);
  route.delete('/:id', catalogsController.deleteCatalog);
};
