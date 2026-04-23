const walletRepository = require('./wallet-repository');
// ⬇️ 1. IMPORT SERVICE ACTIVITIES PUNYA JOSEPHINE DI SINI
const activitiesService = require('../activities/activities-service');

async function updateWallet(userId, amount, type) {
  const user = await walletRepository.getUserById(userId);
  if (!user) return { success: false, error: 'User tidak ditemukan' };

  let currentBalance = user.walletBalance || 0;

  if (type === 'topup') {
    currentBalance += amount;
  } else if (type === 'deduct') {
    if (currentBalance < amount)
      return { success: false, error: 'Saldo tidak cukup' };
    currentBalance -= amount;
  } else {
    return { success: false, error: 'Tipe tidak valid' };
  }

  // Simpan saldo baru ke database wallet
  await walletRepository.updateWalletBalance(userId, currentBalance);

  // ⬇️ 2. CATAT OTOMATIS KE ACTIVITIES HISTORY
  const title = type === 'topup' ? 'Top Up Poin' : 'Penggunaan Poin';
  const description =
    type === 'topup'
      ? `Berhasil top up saldo sebesar ${amount} poin`
      : `Saldo terpotong sebesar ${amount} poin`;

  // Panggil fungsi logTransaction bawaan dari Josephine
  await activitiesService.logTransaction(userId, title, amount, description);

  return { success: true };
}

async function getWalletBalance(userId) {
  const user = await walletRepository.getUserById(userId);

  if (!user) {
    return { success: false, error: 'User tidak ditemukan' };
  }

  /* eslint-disable no-underscore-dangle */
  return {
    success: true,
    data: {
      userId: user._id,
      balance: user.walletBalance || 0,
    },
  };
}

module.exports = {
  updateWallet,
  getWalletBalance,
};
