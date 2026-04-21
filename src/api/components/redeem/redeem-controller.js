const mongoose = require('mongoose');

const User = mongoose.model('Users');
const Voucher = require('../../../models/vouchers');
const Redeem = require('../../../models/redeems');

const redeemVoucher = async (req, res) => {
  try {
    const { id_user, id_voucher } = req.body;

    if (!id_user || !id_voucher) {
      return res.status(400).json({ message: 'Isi ID Voucher dan ID User' });
    }

    // data voucher
    const voucher = await Voucher.findById(id_voucher).lean();
    if (!voucher)
      return res.status(404).json({ message: 'Voucher tidak ditemukan' });

    // data di atlas diambil
    const hargaVoucher = Number(voucher.points_cost || 0);
    const user = await User.findById(id_user);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

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
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyVouchers = async (req, res) => {
  try {
    const { id_user } = req.query;

    if (!id_user) {
      return res.status(400).json({ message: 'Masukkan ID User di URL' });
    }

    const tiketKu = await Redeem.find({ id_user })
      .populate('id_voucher', 'title category points_cost')
      .sort({ redeem_date: -1 });

    res.status(200).json({
      message: 'Ini daftar voucher kamu',
      total_tiket: tiketKu.length,
      data: tiketKu,
    });
  } catch (error) {
    console.error('DEBUG GET VOUCHERS:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { redeemVoucher, getMyVouchers };