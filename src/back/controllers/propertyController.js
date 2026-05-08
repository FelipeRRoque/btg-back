const PropertyService = require("../services/propertyService");

class PropertyController {
  
  // --- PROPRIEDADES ---
  
  static async createProperty(req, res) {
    try {
      // req.user.id vem do authMiddleware
      const property = await PropertyService.createProperty(req.user.id, req.body);
      return res.status(201).json(property);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getMyProperties(req, res) {
    try {
      const properties = await PropertyService.findPropertiesByUser(req.user.id);
      return res.json(properties);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // --- ÁREAS DE PLANTIO ---

  static async createPlantingArea(req, res) {
    try {
      const plantingArea = await PropertyService.createPlantingArea(req.user.id, req.body);
      return res.status(201).json(plantingArea);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PropertyController;