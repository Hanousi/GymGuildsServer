const ChallengeRequest = require('../models/ChallengeRequest');
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

exports.updateFriendRequest = async (req, res) => {
  const friendRequest = await FriendRequest.findOne({
    where: { friendRequestId: req.params.friendRequestId },
  });

  if (!friendRequest) {
    res.status(404);
    return res.send('Request not found');
  }

  friendRequest.status = req.body.status;

  try {
    await friendRequest.save();
  } catch (e) {
    console.log(e);
    return res.status(500);
  }

  return res.send('Request updated');
};

exports.createChallengeRequest = async (req, res) => {
  const [_challengeRequest, created] = await ChallengeRequest.findOrCreate({
    where: { challengeId: req.body.challengeId, toUserId: req.body.toUserId },
    defaults: {
      challengeId: req.body.challengeId,
      fromUserId: req.body.fromUserId,
      toUserId: req.body.toUserId,
    },
  });
  if (!created) {
    res.status(400);
    return res.send('Challenge Request already exists');
  }

  return res.send('Challenge request created');
};

exports.updateChallengeRequest = async (req, res) => {
  const challengeRequest = await ChallengeRequest.findOne({
    where: { challengeRequestId: req.params.challengeRequestId },
  });

  if (!challengeRequest) {
    res.status(404);
    return res.send('Request not found');
  }

  challengeRequest.status = req.body.status;

  try {
    await challengeRequest.save();
  } catch (e) {
    console.log(e);
    return res.status(500);
  }

  return res.send('Request updated');
};
