'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlantingArea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Property, {
        foreignKey: 'property_id',
        as: 'property'
      });
      this.hasMany(models.PlantingRecord, {
        foreignKey: 'planting_area_id',
        as: 'records'
      });
    }
  }
  PlantingArea.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    property_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size_hectares: {
      type: DataTypes.DECIMAL(10,2)
    },
    soil_type: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'PlantingArea',
    tableName: 'planting_areas',
    underscored: true,
  });
  return PlantingArea;
};