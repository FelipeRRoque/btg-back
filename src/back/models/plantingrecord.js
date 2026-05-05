'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlantingRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.PlantingArea, {
        foreignKey: 'planting_area_id',
        as: 'area'
      });
      this.belongsTo(models.Crop, {
        foreignKey: 'crop_id',
        as: 'crop'
    });
    }
  }
  PlantingRecord.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    planting_area_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    crop_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    plant_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    expected_harvest_date: DataTypes.DATEONLY,
    actual_harvest_date: DataTypes.DATEONLY,
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PlantingRecord',
    tableName: 'planting_records',
    underscored: true,
  });
  return PlantingRecord;
};