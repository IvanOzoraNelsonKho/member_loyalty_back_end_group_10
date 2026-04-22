const activitiesRepository = require('./activities-repository');

async function getActivities(userId) {
  return activitiesRepository.getActivities(userId);
}

async function logTransaction(userId, title, points, description) {
  return activitiesRepository.createActivity(
    userId,
    title,
    points,
    description
  );
}

module.exports = {
  getActivities,
  logTransaction,
};
