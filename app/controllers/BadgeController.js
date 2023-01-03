const Badge = require('../models/Badge');
const BadgeUser = require('../models/BadgeUser');

exports.addBadge = async (req, res) => {
  const [_badge, created] = await Badge.findOrCreate({
    where: { badgeName: req.body.badgeName },
    defaults: {
      badgeName: req.body.badgeName,
      badgeImage: req.body.badgeImage,
      badgeDescription: req.body.badgeDescription,
    },
  });
  if (!created) {
    res.send('Badge already exists');
  }

  return res.send('Badge Added');
};

exports.unlockBadgeForUser = async (req, res) => {
  try {
    const [_badgeUser, created] = await BadgeUser.findOrCreate({
      where: { badgeId: req.body.badgeId, userId: req.body.userId },
      defaults: {
        badgeId: req.body.badgeId, userId: req.body.userId,
      },
    });

    if (!created) {
      res.status(400);
      return res.send('User already has badge');
    }
  } catch (e) {
    console.log(e);
  }

  return res.send('Badge unlocked!');
};
