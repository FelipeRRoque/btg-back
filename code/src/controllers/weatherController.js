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

      const selectedProperty = properties.find(
        (prop) => prop.id.toString() === id.toString()
      );

      if (!selectedProperty) {
        return res.status(404).json({
          error: "Propriedade não encontrada ou não pertence a este usuário.",
        });
      }

      if (
        selectedProperty.latitude == null ||
        selectedProperty.longitude == null
      ) {
        return res.status(400).json({
          error: "A propriedade não possui latitude e longitude cadastradas.",
        });
      }

      const currentWeather = await ClimateService.getCurrentWeather(selectedProperty);

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

      const selectedProperty = properties.find(
        (prop) => prop.id.toString() === id.toString()
      );

      if (!selectedProperty) {
        return res.status(404).json({
          error: "Propriedade não encontrada ou não pertence a este usuário.",
        });
      }

      if (
        selectedProperty.latitude == null ||
        selectedProperty.longitude == null
      ) {
        return res.status(400).json({
          error: "A propriedade não possui latitude e longitude cadastradas.",
        });
      }

      const forecastWeather = await ClimateService.getForecast(selectedProperty);

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
      const statusCode = error.message === "Propriedade não encontrada" ? 404 : 500;

      return res.status(statusCode).json({
        error: error.message,
      });
    }
  }
}

module.exports = WeatherController;