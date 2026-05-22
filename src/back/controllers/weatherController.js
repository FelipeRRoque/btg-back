const PropertyService = require("../services/propertyService");
const ClimateService = require("../services/climateService");

class WeatherController {
  static async getCurrentWeatherByProperty(req, res) {
    try {
      const { id } = req.params;

      const properties = await PropertyService.findPropertiesByUser(
        req.user.id
      );

      if (!properties || properties.length === 0) {
        return res.status(404).json({
          error:
            "Nenhuma propriedade encontrada para este usuário. Não é possível obter o clima atual.",
        });
      }

      // Procura a propriedade específica através do ID recebido nos params
      const selectedProperty = properties.find(
        (prop) => prop.id.toString() === id.toString()
      );

      if (!selectedProperty) {
        return res.status(404).json({
          error: "Propriedade não encontrada ou não pertence a este usuário.",
        });
      }

      // Chama o Serviço de clima
      const currentWeather = await ClimateService.getCurrentWeather(selectedProperty);

      // Retorna um objeto JSON unificado mostrando os dados da propriedade e o clima atual
      return res.json({
        property: {
          id: selectedProperty.id,
          name: selectedProperty.name, 
          location: {
            lat: selectedProperty.latitude,
            lon: selectedProperty.longitude,
          },
        },
        current_weather: currentWeather,
      });
    } catch (error) {
      // Ajusta o status code baseado nos erros lançados pelo ClimateService
      const statusCode = error.message === "Propriedade não encontrada" ? 404 : 500;

      return res.status(statusCode).json({
        error: error.message,
      });
    }
  }

  static async getForecastByProperty(req, res) {
    try {
      const { id } = req.params;

      const properties = await PropertyService.findPropertiesByUser(
        req.user.id
      );

      if (!properties || properties.length === 0) {
        return res.status(404).json({
          error:
            "Nenhuma propriedade encontrada para este usuário. Não é possível obter a previsão climática.",
        });
      }

      // Procura a propriedade específica através do ID recebido nos params
      const selectedProperty = properties.find(
        (prop) => prop.id.toString() === id.toString()
      );

      if (!selectedProperty) {
        return res.status(404).json({
          error: "Propriedade não encontrada ou não pertence a este usuário.",
        });
      }

      // Chama o Serviço de clima
      const forecastWeather = await ClimateService.getForecast(selectedProperty);

      // Retorna um objeto JSON unificado mostrando os dados da propriedade e a previsão
      return res.json({
        property: {
          id: selectedProperty.id,
          name: selectedProperty.name,
          location: {
            lat: selectedProperty.latitude,
            lon: selectedProperty.longitude,
          },
        },
        forecast: forecastWeather,
      });
    } catch (error) {
      // Ajusta o status code baseado nos erros lançados pelo ClimateService
      const statusCode = error.message === "Propriedade não encontrada" ? 404 : 500;

      return res.status(statusCode).json({
        error: error.message,
      });
    }
  }
}

module.exports = WeatherController;