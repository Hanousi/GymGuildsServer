const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BannerUser = require('./BannerUser');
const ChallengeUser = require('./ChallengeUser');
const Friends = require('./Friends');
const Banner = require('./Banner');
const Border = require('./Border');
const Challenge = require('./Challenges');
const UserStat = require('./UserStats');
const Badge = require('./Badge');
const BadgeUser = require('./BadgeUser');
const FriendRequest = require('./FriendRequest');
const ChallengeRequest = require('./ChallengeRequest');
const PointsUser = require('./PointsUsers');

const User = sequelize.define(
  'users',
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    selectedBanner: {
      type: DataTypes.UUID,
      defaultValue: 'be2c1ed7-532c-47b9-a3e2-a3f2f5fa7303',
    },
    selectedBorder: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://elasticbeanstalk-eu-west-2-061012721712.s3.eu-west-2.amazonaws.com/assets/avatar1.png',
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    location: DataTypes.GEOMETRY,
    fullName: DataTypes.STRING,
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

User.belongsToMany(Banner, { through: BannerUser, foreignKey: 'userId', as: 'unlockedBanners' });
Banner.belongsToMany(User, { through: BannerUser, foreignKey: 'bannerId' });

User.belongsToMany(Challenge, { through: ChallengeUser, foreignKey: 'userId', as: 'activeChallenges' });
Challenge.belongsToMany(User, { through: ChallengeUser, foreignKey: 'challengeId', as: 'challengeParticipants' });

User.belongsToMany(Challenge, { through: ChallengeUser, foreignKey: 'userId', as: 'expiredChallenges' });
Challenge.belongsToMany(User, { through: ChallengeUser, foreignKey: 'challengeId', as: 'challengeParticipant' });

User.belongsToMany(Badge, { through: BadgeUser, foreignKey: 'userId' });
Badge.belongsToMany(User, { through: BadgeUser, foreignKey: 'badgeId' });

User.hasMany(UserStat, { foreignKey: 'userId' });

User.hasMany(FriendRequest, { foreignKey: 'toUserId', as: 'recievedFriendRequests' });
FriendRequest.belongsTo(User, { foreignKey: 'fromUserId' });

User.hasMany(ChallengeRequest, { foreignKey: 'toUserId', as: 'recievedChallengeRequests' });
ChallengeRequest.belongsTo(Challenge, { foreignKey: 'challengeId' });

User.hasMany(PointsUser, { foreignKey: 'userId' });
PointsUser.belongsTo(User, { foreignKey: 'userId' });

Banner.hasMany(User, { foreignKey: 'selectedBanner' });
User.belongsTo(Banner, { foreignKey: 'selectedBanner', as: 'chosenBanner' });

Border.hasMany(User, { foreignKey: 'selectedBorder' });
User.belongsTo(Border, { foreignKey: 'selectedBorder', as: 'chosenBorder' });

module.exports = User;
