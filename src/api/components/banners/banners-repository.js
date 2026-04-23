const { Banners } = require('../../../models');

async function getBanners() {
  return Banners.find({ isActive: true });
}

async function createBanner(title, image, description) {
  return Banners.create({
    title,
    image,
    description,
  });
}

module.exports = {
  getBanners,
  createBanner,
};
