// ambil model/cetakan dari models
const Voucher = require('../../../models/vouchers');

// fungsi/otak untuk ngambil voucher dari database
async function getVouchers(req, res) {
  try {
    const dataVoucher = await Voucher.find();
    res.json(dataVoucher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// export fungsi
module.exports = {
  getVouchers,
};
