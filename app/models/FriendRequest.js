const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const FriendRequest = sequelize.define('friendRequest', {
  requestId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fromUserId: DataTypes.UUID,
  toUserId: DataTypes.UUID,
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = FriendRequest;
