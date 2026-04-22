const catalogsRepository = require('./catalogs-repository');

async function getCatalogs() {
  return catalogsRepository.getCatalogs();
}

async function getCatalog(id) {
  return catalogsRepository.getCatalog(id);
}

async function createCatalog(catalogData) {
  return catalogsRepository.createCatalog(catalogData);
}

async function updateCatalog(id, updateData) {
  return catalogsRepository.updateCatalog(id, updateData);
}

async function deleteCatalog(id) {
  return catalogsRepository.deleteCatalog(id);
}

module.exports = {
  getCatalogs,
  getCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
};
