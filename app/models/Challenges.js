const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ChallengeUser = require('./ChallengeUser');

const Challenge = sequelize.define('challenges', {
  challengeId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  challengeName: DataTypes.STRING,
  calorieGoal: DataTypes.INTEGER,
  exerciseGoal: DataTypes.INTEGER,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
});

Challenge.hasMany(ChallengeUser, { foreignKey: 'challengeId' });

module.exports = Challenge;
