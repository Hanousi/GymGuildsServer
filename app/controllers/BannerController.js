const Banner = require('../models/Banner');
const BannerUser = require('../models/BannerUser');

exports.addBanner = async (req, res) => {
  const [_banner, created] = await Banner.findOrCreate({
    where: { bannerName: req.body.bannerName },
    defaults: {
      bannerName: req.body.bannerName, bannerImage: req.body.bannerImage,
    },
  });

  if (!created) {
    res.status(400);
    return res.send('Banner already exists');
  }

  return res.send('Banner Created');
};

exports.unlockBannerForUser = async (req, res) => {
  try {
    const [_bannerUser, created] = await BannerUser.findOrCreate({
      where: { bannerId: req.body.bannerId, userId: req.body.userId },
      defaults: {
        bannerId: req.body.bannerId, userId: req.body.userId,
      },
    });

    if (!created) {
      res.status(400);
      return res.send('User already has banner');
    }
  } catch (e) {
    console.log(e);
  }

  return res.send('Banner unlocked!');
};
