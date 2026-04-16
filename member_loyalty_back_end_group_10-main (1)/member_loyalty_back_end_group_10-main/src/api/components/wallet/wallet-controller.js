const walletService = require('./wallet-service');

async function updateWallet(req, res, next) {
  try {
    const userId = req.params.user_id;
    const { amount, type } = req.body;

    if (!amount || !type)
      return res.status(400).json({ error: 'Data tidak lengkap' });

    const result = await walletService.updateWallet(userId, amount, type);
    if (!result.success) return res.status(400).json({ error: result.error });

    return res.status(200).json({ message: 'Saldo berhasil diperbarui' });
  } catch (error) {
    next(error);
  }
}

async function getWallet(req, res, next) {
  try {
    const userId = req.params.user_id;

    const result = await walletService.getWalletBalance(userId);

    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    return res.status(200).json(result.data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateWallet,
  getWallet,
};
