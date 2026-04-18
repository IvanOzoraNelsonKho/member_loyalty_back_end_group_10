const { Catalog } = require('../../../models');

async function getCatalogs() {
  return Catalog.find({});
}

async function getCatalog(id) {
  return Catalog.findById(id);
}

async function createCatalog(name, description, price) {
  return Catalog.create({ name, description, price });
}

async function updateCatalog(id, name, description, price) {
  return Catalog.updateOne({ _id: id }, { $set: { name, description, price } });
}

async function deleteCatalog(id) {
  return Catalog.deleteOne({ _id: id });
}

module.exports = {
  getCatalogs,
  getCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
};
