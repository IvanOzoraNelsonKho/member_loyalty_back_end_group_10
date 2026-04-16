const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const wallet = require('./components/wallet/wallet-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  wallet(app);

  return app;
};
