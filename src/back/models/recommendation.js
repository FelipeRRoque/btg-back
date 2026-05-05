'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Crop, {
        foreignKey: 'crop_id',
        as: 'crop'
      });
      this.belongsTo(models.User, {
        foreignKey: 'author_id',
        as: 'author'
      });
    }
  }
  Recommendation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    crop_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    target_season: {
      type: DataTypes.STRING,
      allowNull: false
    },
    climate_condition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Recommendation',
    tableName: 'recommendations',
    underscored: true,
  });
  return Recommendation;
};