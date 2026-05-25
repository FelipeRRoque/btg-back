'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.PlantingRecord, {
        foreignKey: 'crop_id',
        as: 'records'
      });
      this.hasMany(models.Recommendation, {
        foreignKey: 'crop_id',
        as: 'recommendations'
      });
      // define association here
    }
  }
  Crop.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scientific_name: DataTypes.STRING,
    technical_info: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Crop',
    tableName: 'crops',
    underscored: true,
  });
  return Crop;
};