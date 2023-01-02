const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const BannerUser = sequelize.define('bannerUser', {
  bannerUserId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: DataTypes.UUID,
  bannerId: DataTypes.UUID,
});

module.exports = BannerUser;
