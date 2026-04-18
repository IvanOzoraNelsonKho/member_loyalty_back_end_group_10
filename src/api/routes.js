const express = require('express');
const authRoutes = require('./routes/authRoutes');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const wallet = require('./components/wallet/wallet-route');
const attendance = require('./components/attendance/attendance-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  wallet(app);
  attendance(app);
  app.use('/auth', authRoutes);
  return app;
};
