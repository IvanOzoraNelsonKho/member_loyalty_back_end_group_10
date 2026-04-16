const express = require('express');
const attendanceController = require('./attendance-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/attendance', route);

  route.post('/', attendanceController.attend);
};
