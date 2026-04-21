const catalogsRepository = require('./catalogs-repository');

async function getCatalogs() {
  return catalogsRepository.getCatalogs();
}

async function getCatalog(id) {
  return catalogsRepository.getCatalog(id);
}

async function createCatalog(name, description, price) {
  return catalogsRepository.createCatalog(name, description, price);
}

async function updateCatalog(id, name, description, price) {
  return catalogsRepository.updateCatalog(id, name, description, price);
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
