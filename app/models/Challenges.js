const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Challenge = sequelize.define('challenges', {
  challengeId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  challengeName: DataTypes.STRING,
  calorieGoal: DataTypes.INTEGER,
  exerciseGoal: DataTypes.INTEGER,
});

module.exports = Challenge;
