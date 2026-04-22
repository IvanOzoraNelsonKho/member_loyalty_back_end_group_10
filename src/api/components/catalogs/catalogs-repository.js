const { Catalogs } = require('../../../models');

async function getCatalogs() {
  return Catalogs.find({});
}

async function getCatalog(id) {
  return Catalogs.findById(id);
}

async function createCatalog(catalogData) {
  return Catalogs.create(catalogData);
}

async function updateCatalog(id, updateData) {
  return Catalogs.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
}

async function deleteCatalog(id) {
  return Catalogs.deleteOne({ _id: id });
}

module.exports = {
  getCatalogs,
  getCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
};
