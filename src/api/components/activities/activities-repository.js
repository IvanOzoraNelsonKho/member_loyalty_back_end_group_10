const { Activities } = require('../../../models');

async function getActivities(userId = null) {
  const filter = userId ? { userId } : {};
  return Activities.find(filter).sort({ date: -1 });
}

async function createActivity(userId, title, points, description) {
  // Langsung definisikan field di dalam objek create
  return Activities.create({
    userId,
    title,
    points,
    description,
  });
}

module.exports = {
  getActivities,
  createActivity,
};
