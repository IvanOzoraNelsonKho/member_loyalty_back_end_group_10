const { Activities } = require('../../../models');

async function getActivities() {
  return Activities.find({});
}

async function getActivity(id) {
  return Activities.findById(id);
}

async function createActivity(title, points, description) {
  return Activities.create({ title, points, description });
}

async function updateActivity(id, title, points, description) {
  return Activities.updateOne(
    { _id: id },
    { $set: { title, points, description } }
  );
}

async function deleteActivity(id) {
  return Activities.deleteOne({ _id: id });
}

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
