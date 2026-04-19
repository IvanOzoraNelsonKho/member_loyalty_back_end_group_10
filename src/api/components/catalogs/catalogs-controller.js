const catalogsService = require('./catalogs-service');

async function getCatalogs(request, response, next) {
  try {
    const catalogs = await catalogsService.getCatalogs();
    return response.status(200).json(catalogs);
  } catch (error) {
    return next(error);
  }
}

async function getCatalog(request, response, next) {
  try {
    const catalog = await catalogsService.getCatalog(request.params.id);
    return response.status(200).json(catalog);
  } catch (error) {
    return next(error);
  }
}

async function createCatalog(request, response, next) {
  try {
    const { name, description, price } = request.body;
    const result = await catalogsService.createCatalog(
      name,
      description,
      price
    );
    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function updateCatalog(request, response, next) {
  try {
    const { name, description, price } = request.body;
    await catalogsService.updateCatalog(
      request.params.id,
      name,
      description,
      price
    );
    return response.status(200).json({ message: 'Catalog updated' });
  } catch (error) {
    return next(error);
  }
}

async function deleteCatalog(request, response, next) {
  try {
    await catalogsService.deleteCatalog(request.params.id);
    return response.status(200).json({ message: 'Catalog deleted' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCatalogs,
  getCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
};
