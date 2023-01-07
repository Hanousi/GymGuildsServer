const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Seasons = sequelize.define('seasons', {
  seasonId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  seasonStart: DataTypes.DATE,
  seasonEnd: DataTypes.DATE,
  seasonName: DataTypes.STRING,
});

module.exports = Seasons;
