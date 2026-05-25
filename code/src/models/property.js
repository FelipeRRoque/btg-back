'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      this.belongsTo(models.User, { 
        foreignKey: 'user_id', 
        as: 'owner' 
      });
      this.hasMany(models.PlantingArea, {
        foreignKey: 'property_id',
        as: 'planting_areas'
      });
    }
  }
  Property.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL (10,8)
    },
    longitude: {
      type: DataTypes.DECIMAL (11,8),
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING(2)
    }
  }, {
    sequelize,
    modelName: 'Property',
    tableName: 'properties',
    underscored: true,
  });
  return Property;
};