const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PointsUser = sequelize.define('pointsUser', {
  pointsUserId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  points: {
    type: DataTypes.INTEGER,
  },
  userId: DataTypes.UUID,
});

module.exports = PointsUser;
