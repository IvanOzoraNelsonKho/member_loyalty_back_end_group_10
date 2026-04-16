const { Users } = require('../../../models');

async function getUserById(userId) {
  return Users.findById(userId);
}

async function updateLastAttendance(userId, date) {
  return Users.updateOne({ _id: userId }, { $set: { lastAttendance: date } });
}

module.exports = { getUserById, updateLastAttendance };
