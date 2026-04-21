const activitiesService = require('./activities-service');

async function getActivities(request, response, next) {
  try {
    const activities = await activitiesService.getActivities();
    return response.status(200).json(activities);
  } catch (error) {
    return next(error);
  }
}

async function getActivity(request, response, next) {
  try {
    const activity = await activitiesService.getActivity(request.params.id);
    if (!activity) {
      return response.status(404).json({ error: 'Activity tidak ditemukan' });
    }
    return response.status(200).json(activity);
  } catch (error) {
    return next(error);
  }
}

async function createActivity(request, response, next) {
  try {
    const { title, points, description } = request.body;
    if (!title || points === undefined) {
      return response
        .status(400)
        .json({ error: 'Title dan points wajib diisi' });
    }
    const result = await activitiesService.createActivity(
      title,
      points,
      description
    );
    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function updateActivity(request, response, next) {
  try {
    const { title, points, description } = request.body;
    const result = await activitiesService.updateActivity(
      request.params.id,
      title,
      points,
      description
    );

    if (!result) {
      return response.status(404).json({ error: 'Activity tidak ditemukan' });
    }

    return response
      .status(200)
      .json({ message: 'Activity berhasil diperbarui', data: result });
  } catch (error) {
    return next(error);
  }
}

async function deleteActivity(request, response, next) {
  try {
    const result = await activitiesService.deleteActivity(request.params.id);
    if (result.deletedCount === 0) {
      return response.status(404).json({ error: 'Activity tidak ditemukan' });
    }
    return response.status(200).json({ message: 'Activity berhasil dihapus' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
