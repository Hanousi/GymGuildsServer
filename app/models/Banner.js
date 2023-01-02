const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Banner = sequelize.define('banner', {
  bannerId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bannerName: DataTypes.STRING,
  bannerImage: DataTypes.STRING,
});

module.exports = Banner;
