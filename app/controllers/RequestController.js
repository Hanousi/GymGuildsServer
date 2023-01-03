const FriendRequest = require('../models/FriendRequest');

exports.createFriendRequest = async (req, res) => {
  const [_request, created] = await FriendRequest.findOrCreate({
    where: { fromUserId: req.body.fromUserId, toUserId: req.body.toUserId },
    defaults: {
      fromUserId: req.body.fromUserId,
      toUserId: req.body.toUserId,
    },
  });
  if (!created) {
    res.status(400);
    return res.send('Friend Request already exists');
  }

  return res.send('Friend request created');
};
