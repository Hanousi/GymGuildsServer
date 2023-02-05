const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Border = sequelize.define('border', {
  borderId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  borderName: DataTypes.STRING,
  borderImage: DataTypes.STRING,
});

module.exports = Border;
