const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Friends = sequelize.define('friends', {
  friendsId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: DataTypes.UUID,
  friendId: DataTypes.UUID,
});

module.exports = Friends;
