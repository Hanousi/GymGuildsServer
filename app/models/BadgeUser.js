const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const BadgeUser = sequelize.define('badgeUser', {
  userBadgeId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  badgeId: DataTypes.UUID,
  userId: DataTypes.UUID,
});

module.exports = BadgeUser;
