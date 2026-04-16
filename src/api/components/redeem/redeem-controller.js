const mongoose = require('mongoose');

const User = mongoose.model('Users');
const Voucher = require('../../../models/vouchers');
const Redeem = require('../../../models/redeems');

const redeemVoucher = async (req, res) => {
  try {
    const { id_user, id_voucher } = req.body;

    if (!id_user || !id_voucher) {
      return res
        .status(400)
        .json({ message: 'Isi ID Voucher dan ID User ya!' });
    }

    // data voucher
    const voucher = await Voucher.findById(id_voucher).lean();
    if (!voucher)
      return res.status(404).json({ message: 'Voucher gak ketemu!' });

    // data di atlas diambil
    const hargaVoucher = Number(voucher.points_cost || 0);
    const user = await User.findById(id_user);
    if (!user) return res.status(404).json({ message: 'User gak ketemu!' });

    if (user.walletBalance < hargaVoucher) {
      return res.status(400).json({
        message: 'Saldo kurang, Bos!',
        saldo_saat_ini: user.walletBalance,
        harga_voucher: hargaVoucher,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id_user,
      { $inc: { walletBalance: -hargaVoucher } },
      { new: true }
    );

    const newRedeem = new Redeem({
      id_user,
      id_voucher,
      total_spent: hargaVoucher,
      redeem_date: new Date(),
    });
    await newRedeem.save();

    const responseData = updatedUser.toObject();
    res.status(200).json({
      message: 'Redeem voucher berhasil!',
      sisa_saldo: responseData.walletBalance,
      voucher_diterima: voucher.title,
    });
  } catch (error) {
    console.log('--- ERROR TERMINAL ---');
    console.error(error);
    res.status(500).json({ message: 'Server meledak, cek terminal!' });
  }
};

module.exports = { redeemVoucher };
