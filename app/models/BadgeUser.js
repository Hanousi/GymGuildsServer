const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const BadgeUser = sequelize.define('badgeUser', {
  userBadgeID: {
    type: DataTypes.UUID,
    defualtValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  badgeId: DataTypes.UUID,
  userId: DataTypes.UUID,
});

module.exports = BadgeUser;
