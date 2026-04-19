const mongoose = require('mongoose');

const redeemSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  id_voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
    required: true,
  },
  redeem_date: {
    type: Date,
    default: Date.now,
  },
  total_spent: Number,
});

module.exports = mongoose.model('Redeem', redeemSchema);
