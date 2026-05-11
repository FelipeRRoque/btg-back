const PropertyService = require("../services/propertyService");
const CropService = require("../services/cropService");
const ClimateService = require("../services/climateService");

class CropHistoryController {
  static async findHistoryById(req, res) {
    try {
      const { id } = req.params; 

      const crop = await CropService.findById(id);

      const properties = await PropertyService.findPropertiesByUserId(req.user.id);

      if (!properties || properties.length === 0) {
        return res.status(404).json({ 
          error: "Nenhuma propriedade encontrada para este usuário. Não é possível calcular o histórico climático." 
        });
      }

      const selectedProperty = properties[0];

      // Chama o Serviço de clima.
      const climateHistory = await ClimateService.getHistoricalData(selectedProperty.id);

      // Retorna um objeto JSON unificado mostrando os dados da cultura, da propriedade e do histórico climático.
      return res.json({
        crop: {
          id: crop.id,
          name: crop.name,
          scientific_name: crop.scientific_name,
          technical_info: crop.technical_info
        },
        property: {
          name: selectedProperty.name,
          location: {
            lat: selectedProperty.latitude,
            lon: selectedProperty.longitude
          }
        },
        climate_history: climateHistory 
      });

    } catch (error) {
      const statusCode = error.message === "Cultura não encontrada" ? 404 : 500;
      return res.status(statusCode).json({ error: error.message });
    }
  }
}

module.exports = CropHistoryController;