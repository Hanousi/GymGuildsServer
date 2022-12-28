const Badge = require('../models/Badge');

exports.createBadge = async (req, res) => {
  console.log(req.body);

  const badge = new Badge({
    badgeName: req.body.badgeName,
    badgeImage: req.body.badgeImage,
    badgeDescription: req.body.badgeDescription,
  });

  try {
    await badge.save();
  } catch (e) {
    console.log(e);
  }

  res.send('Badge Added');
};
