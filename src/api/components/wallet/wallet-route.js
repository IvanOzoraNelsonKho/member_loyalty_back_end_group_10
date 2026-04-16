const express = require('express');
const walletController = require('./wallet-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/wallet', route);
  route.patch('/:user_id', walletController.updateWallet);
  route.get('/:user_id', walletController.getWallet);
};
