const PropertyService = require("../services/propertyService");
const CropService = require("../services/cropService");
const ClimateService = require("../services/climateService");

class CropHistoryController {
  static async findHistoryById(req, res) {
    /* #swagger.tags = ['Climate History']
       #swagger.summary = 'Consultar histórico climático de uma cultura'
       #swagger.description = 'Retorna informações da cultura, da propriedade do usuário e o histórico climático da região.'

       #swagger.security = [{
          "bearerAuth": []
       }]

       #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID da cultura',
          required: true,
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000'
       }

       #swagger.responses[200] = {
          description: 'Histórico climático retornado com sucesso',
          schema: {
            crop: {
              id: "550e8400-e29b-41d4-a716-446655440000",
              name: "Milho",
              scientific_name: "Zea mays",
              technical_info: "Cultura adaptada ao clima tropical."
            },
            property: {
              name: "Fazenda Esperança",
              location: {
                lat: -19.9191,
                lon: -43.9386
              }
            },
            climate_history: {
              propertyId: "550e8400-e29b-41d4-a716-446655440000",
              startDate: "2015-01-01",
              endDate: "2023-12-31",
              dailyRecords: [
                {
                  date: "2023-01-01",
                  maxTemp: 31.5,
                  minTemp: 18.2,
                  precipitation: 12.3
                }
              ]
            }
          }
       }

       #swagger.responses[404] = {
          description: 'Cultura ou propriedade não encontrada'
       }

       #swagger.responses[500] = {
          description: 'Erro interno do servidor'
       }
    */

    try {
      const { id } = req.params;

      const crop = await CropService.findById(id);

      const properties = await PropertyService.findPropertiesByUser(
        req.user.id,
      );

      if (!properties || properties.length === 0) {
        return res.status(404).json({
          error:
            "Nenhuma propriedade encontrada para este usuário. Não é possível calcular o histórico climático.",
        });
      }

      const selectedProperty = properties[0];

      // Chama o Serviço de clima.
      const climateHistory =
        await ClimateService.getHistoricalData(selectedProperty);

      // Retorna um objeto JSON unificado mostrando os dados da cultura, da propriedade e do histórico climático.
      return res.json({
        crop: {
          id: crop.id,
          name: crop.name,
          scientific_name: crop.scientific_name,
          technical_info: crop.technical_info,
        },

        property: {
          name: selectedProperty.name,

          location: {
            lat: selectedProperty.latitude,
            lon: selectedProperty.longitude,
          },
        },

        climate_history: climateHistory,
      });
    } catch (error) {
      const statusCode = error.message === "Cultura não encontrada" ? 404 : 500;

      return res.status(statusCode).json({
        error: error.message,
      });
    }
  }
}

module.exports = CropHistoryController;
