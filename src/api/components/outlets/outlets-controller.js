const outletsService = require('./outlets-service');

async function getOutlets(request, response, next) {
  try {
    const outlets = await outletsService.getOutlets();
    return response.status(200).json(outlets);
  } catch (error) {
    return next(error);
  }
}

async function createOutlet(request, response, next) {
  try {
    const { name } = request.body;
    const { location } = request.body;
    const { description } = request.body;

    const success = await outletsService.createOutlet(
      name,
      location,
      description
    );

    if (!success) {
      return response.status(500).json({ message: 'Failed to create outlet' });
    }

    return response.status(200).json({ message: 'Outlet created' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getOutlets,
  createOutlet,
};
