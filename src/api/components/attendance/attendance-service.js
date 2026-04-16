const attendanceRepository = require('./attendance-repository');
// Kita panggil fitur wallet-mu untuk menambahkan poin!
const walletService = require('../wallet/wallet-service');

async function recordAttendance(userId) {
  const user = await attendanceRepository.getUserById(userId);
  if (!user) return { success: false, error: 'User tidak ditemukan' };

  // 1. Cek apakah user sudah absen hari ini
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set jam ke 00:00:00 untuk fokus ke tanggalnya saja

  if (user.lastAttendance) {
    const lastAtt = new Date(user.lastAttendance);
    lastAtt.setHours(0, 0, 0, 0);

    // Kalau tanggal absen terakhir sama dengan tanggal hari ini, tolak!
    if (lastAtt.getTime() === today.getTime()) {
      return {
        success: false,
        error: 'Kamu sudah mengambil bonus absen hari ini',
      };
    }
  }

  // 2. Kalau belum absen, update tanggal absen menjadi waktu sekarang
  await attendanceRepository.updateLastAttendance(userId, new Date());

  // 3. Tambahkan poin gratis (Misal: 100 poin) ke wallet user
  const poinGratis = 100;
  await walletService.updateWallet(userId, poinGratis, 'topup');

  return {
    success: true,
    message: 'Absen berhasil!',
    pointsAdded: poinGratis,
  };
}

module.exports = { recordAttendance };
