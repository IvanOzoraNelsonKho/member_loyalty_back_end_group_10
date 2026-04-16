const walletRepository = require('./wallet-repository');

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

  await walletRepository.updateWalletBalance(userId, currentBalance);
  return { success: true };
}

async function getWalletBalance(userId) {
  const user = await walletRepository.getUserById(userId);

  if (!user) {
    return { success: false, error: 'User tidak ditemukan' };
  }

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
