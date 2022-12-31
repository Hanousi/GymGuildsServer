const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ChallengeUser = require('./ChallengeUser');
const Friends = require('./Friends');

const User = sequelize.define(
  'users',
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fullName: DataTypes.STRING,
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return undefined;
      },
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['email'],
      }],
  },
);

User.hasMany(ChallengeUser, { foreignKey: 'userId' });
User.belongsToMany(User, { as: 'myFriends', through: Friends, foreignKey: 'userId' });
User.belongsToMany(User, { as: 'friend', through: Friends, foreignKey: 'friendId' });

module.exports = User;
