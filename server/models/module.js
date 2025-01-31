'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Module.hasMany(models.MyModule, { foreignKey: "ModuleId" })
      Module.belongsTo(models.User, { foreignKey: "AuthorId" })
      Module.belongsTo(models.Team, { foreignKey: "TeamId" })
    }
  }
  Module.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};