const express = require('express');
const activitiesController = require('./activities-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/activities', route);

  route.get('/', activitiesController.getActivities);
  route.post('/', activitiesController.createActivity);
  route.get('/:id', activitiesController.getActivity);
  route.put('/:id', activitiesController.updateActivity);
  route.delete('/:id', activitiesController.deleteActivity);
};
