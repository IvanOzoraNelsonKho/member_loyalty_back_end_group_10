const outletsRepository = require('./outlets-repository');

async function getOutlets() {
  const outlets = await outletsRepository.getOutlets();

  const results = [];
  for (let i = 0; i < outlets.length; i += 1) {
    const outlet = outlets[i];
    results.push({
      id: outlet.id,
      name: outlet.name,
      location: outlet.location,
      description: outlet.description,
    });
  }

  return results;
}

async function createOutlet(name, location, description) {
  try {
    await outletsRepository.createOutlet(name, location, description);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getOutlets,
  createOutlet,
};
