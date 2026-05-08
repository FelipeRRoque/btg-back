const { Property, PlantingArea } = require("../models");

class PropertyService {
  // --- PROPRIEDADES ---

  static async createProperty(userId, data) {
    const property = await Property.create({
      user_id: userId, // Forçamos o ID do token JWT para segurança
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      state: data.state
    });
    return property;
  }

  static async findPropertiesByUser(userId) {
    return await Property.findAll({
      where: { user_id: userId },
      include: [{ model: PlantingArea, as: 'planting_areas' }] // Traz as áreas junto
    });
  }

  // --- ÁREAS DE PLANTIO ---

  static async createPlantingArea(userId, data) {
    // Verifica se a propriedade existe e se pertence ao usuário logado
    const property = await Property.findOne({
      where: { id: data.property_id, user_id: userId }
    });

    if (!property) {
      throw new Error("Propriedade não encontrada ou não pertence a você.");
    }

    const plantingArea = await PlantingArea.create({
      property_id: data.property_id,
      name: data.name,
      size_hectares: data.size_hectares,
      soil_type: data.soil_type
    });

    return plantingArea;
  }
}

module.exports = PropertyService;