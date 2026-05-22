const { Property, PlantingArea } = require("../models");

class PropertyService {
  static async createProperty(userId, data) {
    const property = await Property.create({
      user_id: userId,
      name: data.name,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
    });

    return property;
  }

  static async findPropertiesByUser(userId) {
    const properties = await Property.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: PlantingArea,
          as: "planting_areas",
          required: false,
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return properties;
  }

  static async getMyProperties(userId) {
    return this.findPropertiesByUser(userId);
  }

  static async updateProperty(userId, propertyId, data) {
    const property = await Property.findOne({
      where: {
        id: propertyId,
        user_id: userId,
      },
    });

    if (!property) {
      throw new Error("Propriedade não encontrada ou não pertence a você.");
    }

    await property.update({
      name: data.name ?? property.name,
      latitude: data.latitude ?? property.latitude,
      longitude: data.longitude ?? property.longitude,
      city: data.city ?? property.city,
      state: data.state ?? property.state,
    });

    return property;
  }

  static async deleteProperty(userId, propertyId) {
    const property = await Property.findOne({
      where: {
        id: propertyId,
        user_id: userId,
      },
    });

    if (!property) {
      throw new Error("Propriedade não encontrada ou não pertence a você.");
    }

    await PlantingArea.destroy({
      where: {
        property_id: propertyId,
      },
    });

    await property.destroy();

    return {
      message: "Propriedade excluída com sucesso.",
    };
  }

  static async createPlantingArea(userId, data) {
    const property = await Property.findOne({
      where: {
        id: data.property_id,
        user_id: userId,
      },
    });

    if (!property) {
      throw new Error("A propriedade informada não pertence a você.");
    }

    const plantingArea = await PlantingArea.create({
      property_id: data.property_id,
      name: data.name,
      size_hectares: data.size_hectares ?? null,
      soil_type: data.soil_type ?? null,
    });

    return plantingArea;
  }

  static async updatePlantingArea(userId, plantingAreaId, data) {
    const plantingArea = await PlantingArea.findOne({
      where: {
        id: plantingAreaId,
      },
      include: [
        {
          model: Property,
          as: "property",
          where: {
            user_id: userId,
          },
        },
      ],
    });

    if (!plantingArea) {
      throw new Error("Área de plantio não encontrada ou não pertence a você.");
    }

    if (data.property_id) {
      const property = await Property.findOne({
        where: {
          id: data.property_id,
          user_id: userId,
        },
      });

      if (!property) {
        throw new Error("A propriedade informada não pertence a você.");
      }
    }

    await plantingArea.update({
      property_id: data.property_id ?? plantingArea.property_id,
      name: data.name ?? plantingArea.name,
      size_hectares: data.size_hectares ?? plantingArea.size_hectares,
      soil_type: data.soil_type ?? plantingArea.soil_type,
    });

    return plantingArea;
  }

  static async deletePlantingArea(userId, plantingAreaId) {
    const plantingArea = await PlantingArea.findOne({
      where: {
        id: plantingAreaId,
      },
      include: [
        {
          model: Property,
          as: "property",
          where: {
            user_id: userId,
          },
        },
      ],
    });

    if (!plantingArea) {
      throw new Error("Área de plantio não encontrada ou não pertence a você.");
    }

    await plantingArea.destroy();

    return {
      message: "Área de plantio excluída com sucesso.",
    };
  }

  static async findPlantingAreaById(userId, plantingAreaId) {
    const plantingArea = await PlantingArea.findOne({
      where: {
        id: plantingAreaId,
      },
      include: [
        {
          model: Property,
          as: "property",
          where: {
            user_id: userId,
          },
        },
      ],
    });

    if (!plantingArea) {
      throw new Error("Área de plantio não encontrada ou não pertence a você.");
    }

    return plantingArea;
  }
}

module.exports = PropertyService;