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
    if (!catalog) {
      return response.status(404).json({ message: 'Catalog not found' });
    }
    return response.status(200).json(catalog);
  } catch (error) {
    return next(error);
  }
}

async function createCatalog(request, response, next) {
  try {
    const { name, description, price, options } = request.body;

    if (!name || !price) {
      return response
        .status(400)
        .json({ error: 'Name and price are required' });
    }

    const result = await catalogsService.createCatalog({
      name,
      description,
      price,
      options,
    });

    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function updateCatalog(request, response, next) {
  try {
    const result = await catalogsService.updateCatalog(
      request.params.id,
      request.body
    );
    if (!result) {
      return response.status(404).json({ message: 'Catalog not found' });
    }
    return response
      .status(200)
      .json({ message: 'Catalog updated successfully', data: result });
  } catch (error) {
    return next(error);
  }
}

async function deleteCatalog(request, response, next) {
  try {
    const result = await catalogsService.deleteCatalog(request.params.id);
    if (result.deletedCount === 0) {
      return response.status(404).json({ message: 'Catalog not found' });
    }
    return response
      .status(200)
      .json({ message: 'Catalog deleted successfully' });
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
