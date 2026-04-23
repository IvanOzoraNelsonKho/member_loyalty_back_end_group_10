const mongoose = require('mongoose');

const User = mongoose.model('Users');
const Voucher = require('../../../models/vouchers');
const Redeem = require('../../../models/redeems');
const activitiesService = require('../activities/activities-service');

const redeemVoucher = async (req, res) => {
  try {
    const { id_user, id_voucher } = req.body;

    if (!id_user || !id_voucher) {
      return res.status(400).json({ message: 'Isi ID Voucher dan ID User' });
    }

    const userObjId = new mongoose.Types.ObjectId(id_user.trim());
    const voucherObjId = new mongoose.Types.ObjectId(id_voucher.trim());

    const voucher = await Voucher.findById(voucherObjId).lean();
    if (!voucher)
      return res.status(404).json({ message: 'Voucher tidak ditemukan' });

    const hargaVoucher = Number(voucher.points_cost || voucher.points || 0);

    const user = await User.findById(userObjId);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    if (user.walletBalance < hargaVoucher) {
      return res
        .status(400)
        .json({ message: 'Saldo kurang', sisa_saldo: user.walletBalance });
    }

    user.walletBalance -= hargaVoucher;
    await user.save();

    await Redeem.create({
      id_user: userObjId,
      id_voucher: voucherObjId,
      total_spent: hargaVoucher,
      redeem_date: new Date(),
    });

    const title = 'Redeem Voucher';
    const description = `Berhasil menukar voucher: ${voucher.title || 'Promo'}`;
    await activitiesService.logTransaction(
      id_user,
      title,
      hargaVoucher,
      description
    );

    res.status(200).json({
      message: 'Redeem voucher berhasil!',
      sisa_saldo: user.walletBalance,
      voucher_diterima: voucher.title,
    });
  } catch (error) {
    console.error('ERROR REDEEM POST:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyVouchers = async (req, res) => {
  try {
    const { id_user } = req.query;

    if (!id_user) {
      return res
        .status(400)
        .json({ message: 'Masukkan ID User di URL (?id_user=...)' });
    }

    const userObjId = new mongoose.Types.ObjectId(id_user.trim());

    const tiketKu = await Redeem.find({ id_user: userObjId })
      .sort({ redeem_date: -1 })
      .lean();

    for (let i = 0; i < tiketKu.length; i++) {
      const detailVoucher = await Voucher.findById(
        tiketKu[i].id_voucher
      ).lean();
      if (detailVoucher) {
        tiketKu[i].id_voucher = {
          _id: detailVoucher._id,
          title: detailVoucher.title,
          category: detailVoucher.category,
          points_cost: detailVoucher.points_cost || detailVoucher.points,
        };
      }
    }

    res.status(200).json({
      message: 'Ini daftar voucher kamu',
      total_tiket: tiketKu.length,
      data: tiketKu,
    });
  } catch (error) {
    console.error('ERROR GET VOUCHERS:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { redeemVoucher, getMyVouchers };
