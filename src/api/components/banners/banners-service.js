const bannersRepository = require('./banners-repository');

async function getBanners() {
  return bannersRepository.getBanners();
}

async function createBanner(title, image, description) {
  return bannersRepository.createBanner(title, image, description);
}

module.exports = {
  getBanners,
  createBanner,
};
