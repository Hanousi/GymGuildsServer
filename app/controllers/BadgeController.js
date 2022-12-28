const Badge = require('../models/Badge');

exports.createBadge = async (req, res) => {
  const [badge, created] = await Badge.findOrCreate({
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
