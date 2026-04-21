const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const vouchersController = require('./components/vouchers/vouchers-controller');
const { redeemVoucher, getMyVouchers } = require('./components/redeem/redeem-controller');
const wallet = require('./components/wallet/wallet-route');
const attendance = require('./components/attendance/attendance-route');
const catalogs = require('./components/catalogs/catalogs-route');

const outlets = require('./components/outlets/outlets-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  wallet(app);
  attendance(app);
  catalogs(app);

  app.get('/vouchers', vouchersController.getVouchers);
  app.post('/redeem', redeemVoucher);
  app.get('/my-vouchers', getMyVouchers);
  return app;
};
