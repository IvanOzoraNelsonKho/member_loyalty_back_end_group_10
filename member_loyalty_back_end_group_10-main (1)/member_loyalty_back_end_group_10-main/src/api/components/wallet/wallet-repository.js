const { Users } = require('../../../models');

async function getUserById(userId) {
  return Users.findById(userId);
}

async function updateWalletBalance(userId, newBalance) {
  return Users.updateOne(
    { _id: userId },
    { $set: { walletBalance: newBalance } }
  );
}

module.exports = { getUserById, updateWalletBalance };
