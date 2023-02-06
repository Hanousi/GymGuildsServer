const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ChallengeUser = require('./ChallengeUser');

const Challenge = sequelize.define('challenges', {
  challengeId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'https://elasticbeanstalk-eu-west-2-061012721712.s3.eu-west-2.amazonaws.com/assets/boris.jpeg',
  },
  challengeName: DataTypes.STRING,
  calorieGoal: DataTypes.INTEGER,
  exerciseGoal: DataTypes.INTEGER,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
});

Challenge.hasMany(ChallengeUser, { foreignKey: 'challengeId' });

module.exports = Challenge;
