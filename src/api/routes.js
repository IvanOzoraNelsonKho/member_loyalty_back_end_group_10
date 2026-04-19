const express = require('express');

// controller / panggil boxnya
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const vouchersController = require('./components/vouchers/vouchers-controller');
const { redeemVoucher, getMyVouchers } = require('./components/redeem/redeem-controller');

// wadah yang diexport
module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);

  // isi/route boxnya
  app.get('/vouchers', vouchersController.getVouchers);
  app.post('/redeem', redeemVoucher);
  app.get('/my-vouchers', getMyVouchers);
  return app;
};
