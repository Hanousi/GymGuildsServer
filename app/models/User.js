const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BannerUser = require('./BannerUser');
const ChallengeUser = require('./ChallengeUser');
const Friends = require('./Friends');
const Banner = require('./Banner');
const Challenge = require('./Challenges');
const UserStat = require('./UserStats');
const Badge = require('./Badge');
const BadgeUser = require('./BadgeUser');
const FriendRequest = require('./FriendRequest');

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

User.belongsToMany(Banner, { through: BannerUser, foreignKey: 'userId' });
Banner.belongsToMany(User, { through: BannerUser, foreignKey: 'bannerId' });

User.belongsToMany(Challenge, { through: ChallengeUser, foreignKey: 'userId' });
Challenge.belongsToMany(User, { through: ChallengeUser, foreignKey: 'challengeId' });

User.belongsToMany(Badge, { through: BadgeUser, foreignKey: 'userId' });
Badge.belongsToMany(User, { through: BadgeUser, foreignKey: 'badgeId' });

User.hasMany(UserStat, { foreignKey: 'userId' });

User.hasMany(FriendRequest, { foreignKey: 'toUserId', as: 'recievedFriendRequests' });
FriendRequest.belongsTo(User, { foreignKey: 'fromUserId' });

module.exports = User;
