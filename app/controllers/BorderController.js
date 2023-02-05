const Border = require('../models/Border');

exports.addBorder = async (req, res) => {
  const [_border, created] = await Border.findOrCreate({
    where: { borderName: req.body.borderName },
    defaults: {
      borderName: req.body.borderName, borderImage: req.body.borderImage,
    },
  });

  if (!created) {
    res.status(400);
    return res.send('Border already exists');
  }

  return res.send('Border Created');
};

// TODO for Border
// exports.unlockBannerForUser = async (req, res) => {
//   try {
//     const [_bannerUser, created] = await BannerUser.findOrCreate({
//       where: { bannerId: req.body.bannerId, userId: req.body.userId },
//       defaults: {
//         bannerId: req.body.bannerId, userId: req.body.userId,
//       },
//     });

//     if (!created) {
//       res.status(400);
//       return res.send('User already has banner');
//     }
//   } catch (e) {
//     console.log(e);
//   }

//   return res.send('Banner unlocked!');
// };
