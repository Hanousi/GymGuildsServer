const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ChallengeRequest = sequelize.define('challengeRequest', {
  challengeRequestId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fromUserId: DataTypes.UUID,
  toUserId: DataTypes.UUID,
  challengeId: DataTypes.UUID,
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = ChallengeRequest;
