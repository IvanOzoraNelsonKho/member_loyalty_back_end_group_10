const activitiesService = require('./activities-service');

async function getActivities(request, response, next) {
  try {
    const { userId } = request.query;
    const activities = await activitiesService.getActivities(userId);

    return response.status(200).json({
      status: 'success',
      data: activities,
    });
  } catch (error) {
    return next(error);
  }
}

async function createActivity(req, res, next) {
  try {
    const { userId, title, points, description } = req.body;

    await activitiesService.logTransaction(userId, title, points, description);

    return res.status(201).json({
      status: 'success',
      message: 'Aktivitas berhasil dicatat!',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getActivities,
  createActivity,
};
