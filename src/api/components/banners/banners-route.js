const express = require('express');
const bannersController = require('./banners-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/banners', route);

  route.get('/', bannersController.getBanners);
  route.post('/', bannersController.createBanner); // Buat nambahin data pas ngetes
};
