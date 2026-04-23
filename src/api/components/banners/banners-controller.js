const bannersService = require('./banners-service');

async function getBanners(req, res, next) {
  try {
    const banners = await bannersService.getBanners();
    return res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    return next(error);
  }
}

async function createBanner(req, res, next) {
  try {
    const { title, image, description } = req.body;
    const newBanner = await bannersService.createBanner(
      title,
      image,
      description
    );
    return res.status(201).json({
      success: true,
      message: 'Banner berhasil dibuat',
      data: newBanner,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBanners,
  createBanner,
};
