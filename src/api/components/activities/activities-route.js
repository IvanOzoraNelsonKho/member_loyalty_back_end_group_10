const express = require('express');
const activitiesController = require('./activities-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/activities', route);

  route.get('/', activitiesController.getActivities);
  route.post('/', activitiesController.createActivity);
};
