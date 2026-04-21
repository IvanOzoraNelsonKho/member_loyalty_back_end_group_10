module.exports = (db) =>
  db.model(
    'Users',
    db.Schema({
      email: String,
      password: { type: String, select: false }, 
      fullName: String,
      walletBalance: {
        type: Number,
        default: 0,
      },
      lastAttendance: {
        type: Date,
        default: null,
      },
    })
  );
