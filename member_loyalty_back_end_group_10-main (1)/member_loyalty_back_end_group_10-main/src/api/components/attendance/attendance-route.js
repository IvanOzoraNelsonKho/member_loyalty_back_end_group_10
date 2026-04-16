const express = require('express');
const attendanceController = require('./attendance-controller');

const route = express.Router();

module.exports = (app) => {
  // Semua yang ke arah sini akan diawali /api/attendance
  app.use('/attendance', route);

  // Endpoint: POST /api/attendance
  route.post('/', attendanceController.attend);
};
