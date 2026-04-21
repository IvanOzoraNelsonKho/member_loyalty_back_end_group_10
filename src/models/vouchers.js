const mongoose = require('mongoose');

// cetakan/model dari data di atlas
const voucherSchema = new mongoose.Schema({
  title: String,
  points_cost: Number,
  category: String,
  status: String,
});

// export biar bisa dipake file lain
module.exports = mongoose.model('Voucher', voucherSchema);
