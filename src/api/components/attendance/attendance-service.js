const attendanceRepository = require('./attendance-repository');
const walletService = require('../wallet/wallet-service');

async function recordAttendance(userId) {
  const user = await attendanceRepository.getUserById(userId);
  if (!user) return { success: false, error: 'User tidak ditemukan' };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user.lastAttendance) {
    const lastAtt = new Date(user.lastAttendance);
    lastAtt.setHours(0, 0, 0, 0);

    if (lastAtt.getTime() === today.getTime()) {
      return {
        success: false,
        error: 'Kamu sudah mengambil bonus absen hari ini',
      };
    }
  }

  await attendanceRepository.updateLastAttendance(userId, new Date());

  const poinGratis = 100;
  await walletService.updateWallet(userId, poinGratis, 'topup');

  return {
    success: true,
    message: 'Absen berhasil!',
    pointsAdded: poinGratis,
  };
}

module.exports = { recordAttendance };
