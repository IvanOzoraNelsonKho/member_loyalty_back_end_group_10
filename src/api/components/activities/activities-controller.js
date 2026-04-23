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

module.exports = {
  getActivities,
};
