const { Outlet } = require('../../../models);

  async function getOutlets() {
    return Outlet.find({});
  }

  async function createOutlet(name, location, description) {
    return Outlet.create({
      name,
      location,
      description,
    });
  }

  module.exports = {
    getOutlets,
    createOutlet,
  };
