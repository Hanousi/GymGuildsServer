const Friends = require('../models/Friends');

exports.addFriend = async (req, res) => {
  const [_friends, created] = await Friends.findOrCreate({
    where: { userId: req.body.userId, friendId: req.body.friendId },
    defaults: {
      userId: req.body.userId, friendId: req.body.friendId,
    },
  });

  if (!created) {
    res.status(400);
    return res.send('Users are already friends');
  }

  const otherFriend = new Friends({
    userId: req.body.friendId,
    friendId: req.body.userId,
  });

  try {
    await otherFriend.save();
  } catch (e) {
    console.log(e);
  }

  return res.send('Friendship made!');
};
