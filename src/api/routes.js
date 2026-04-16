const express = require('express');

// controller
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const vouchersController = require('./components/vouchers/vouchers-controller');
const redeemController = require('./components/redeem/redeem-controller');

// wadah yang diexport
module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);

  app.get('/vouchers', vouchersController.getVouchers);
  app.post('/redeem', redeemController.redeemVoucher);

  return app;
};
