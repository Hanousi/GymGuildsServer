const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ChallengeUser = sequelize.define('challengeUser', {
  challengeUserId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: DataTypes.UUID,
  challengeId: DataTypes.UUID,
});

module.exports = ChallengeUser;
