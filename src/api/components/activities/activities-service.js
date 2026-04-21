const activitiesRepository = require('./activities-repository');

async function getActivities() {
  return activitiesRepository.getActivities();
}

async function getActivity(id) {
  return activitiesRepository.getActivity(id);
}

async function createActivity(title, points, description) {
  return activitiesRepository.createActivity(title, points, description);
}

async function updateActivity(id, title, points, description) {
  return activitiesRepository.updateActivity(id, title, points, description);
}

async function deleteActivity(id) {
  return activitiesRepository.deleteActivity(id);
}

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
