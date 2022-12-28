const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Badge = sequelize.define('badge', {
  badgeId: {
    type: DataTypes.UUID,
    defualtValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  badgeName: DataTypes.STRING,
  badgeImage: DataTypes.STRING,
  badgeDescription: DataTypes.STRING,
});

module.exports = Badge;
