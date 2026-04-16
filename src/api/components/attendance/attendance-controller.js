const attendanceService = require('./attendance-service');

async function attend(req, res, next) {
  try {
    // Ambil ID user dari body JSON
    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ error: 'user_id wajib diisi' });

    // Panggil service
    const result = await attendanceService.recordAttendance(user_id);

    if (!result.success) return res.status(400).json({ error: result.error });

    return res.status(200).json({
      message: result.message,
      points_added: result.pointsAdded,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { attend };
