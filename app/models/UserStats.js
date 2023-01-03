const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const UserStat = sequelize.define('userStat', {
  userStatId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: DataTypes.UUID,
  statName: DataTypes.STRING,
  value: DataTypes.INTEGER,
});

module.exports = UserStat;
