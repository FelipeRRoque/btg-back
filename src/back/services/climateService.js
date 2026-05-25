const {
  ClimateHistory,
  DailyClimate,
  WeatherResponse,
  CurrentWeather,
  ForecastWeather,
} = require("../models/dtos/climateDTOs");

class ClimateService {
  static async getHistoricalData(property) {
    return this.getRecentHistoricalData(property, {
      startDate: "2010-01-01",
      endDate: new Date().toISOString().split("T")[0],
    });
  }

  static async getRecentHistoricalData(property, options = {}) {
    if (!property) {
      throw new Error("Propriedade não encontrada");
    }

    const endDate = options.endDate || new Date().toISOString().split("T")[0];
    const startDate =
      options.startDate ||
      new Date(Date.now() - Number(options.days || 15) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

    try {
      const baseUrl = "https://archive-api.open-meteo.com/v1/archive";
      const params = new URLSearchParams({
        latitude: property.latitude,
        longitude: property.longitude,
        start_date: startDate,
        end_date: endDate,
        daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
        timezone: "America/Sao_Paulo",
      });

      const response = await fetch(`${baseUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Erro na API Open-Meteo: Status ${response.status}`);
      }

      const rawData = await response.json();
      const times = rawData.daily?.time || [];

      const dailyRecords = times.map((dateStr, index) => {
        return new DailyClimate(
          dateStr,
          rawData.daily.temperature_2m_max[index],
          rawData.daily.temperature_2m_min[index],
          rawData.daily.precipitation_sum[index],
        );
      });

      return new ClimateHistory(property.id, startDate, endDate, dailyRecords);
    } catch (error) {
      throw new Error(`Falha ao obter histórico climático: ${error.message}`);
    }
  }

  static async getCurrentWeather(property) {
    try {
      if (!property) {
        throw new Error("Propriedade não encontrada");
      }

      const baseUrl = "https://api.open-meteo.com/v1/forecast";
      const params = new URLSearchParams({
        latitude: property.latitude,
        longitude: property.longitude,
        current: "temperature_2m,precipitation,rain",
        timezone: "America/Sao_Paulo",
      });

      const response = await fetch(`${baseUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Erro na API Open-Meteo: Status ${response.status}`);
      }

      const rawData = await response.json();

      return new CurrentWeather(
        rawData.current.temperature_2m,
        rawData.current.precipitation ?? 0,
        rawData.current.rain ?? 0,
      );
    } catch (error) {
      throw new Error(`Falha ao obter clima atual: ${error.message}`);
    }
  }

  static async getForecast(property) {
    try {
      if (!property) {
        throw new Error("Propriedade não encontrada");
      }

      const baseUrl = "https://api.open-meteo.com/v1/forecast";
      const params = new URLSearchParams({
        latitude: property.latitude,
        longitude: property.longitude,
        daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
        forecast_days: 7,
        timezone: "America/Sao_Paulo",
      });

      const response = await fetch(`${baseUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Erro na API Open-Meteo: Status ${response.status}`);
      }

      const rawData = await response.json();
      const times = rawData.daily?.time || [];

      return times.map((date, index) => {
        return new ForecastWeather(
          date,
          rawData.daily.temperature_2m_max[index],
          rawData.daily.temperature_2m_min[index],
          rawData.daily.precipitation_sum[index],
        );
      });
    } catch (error) {
      throw new Error(`Falha ao obter previsão climática: ${error.message}`);
    }
  }

  static async getForecastData(property) {
    try {
      if (!property) {
        throw new Error("Propriedade não encontrada");
      }

      const baseUrl = "https://api.open-meteo.com/v1/forecast";
      const params = new URLSearchParams({
        latitude: property.latitude,
        longitude: property.longitude,
        current: "temperature_2m,precipitation",
        timezone: "America/Sao_Paulo",
      });

      const response = await fetch(`${baseUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Erro na API Open-Meteo: Status ${response.status}`);
      }

      const data = await response.json();

      return new WeatherResponse(
        data.latitude,
        data.longitude,
        {
          temperature: data.current.temperature_2m,
          precipitation: data.current.precipitation,
        },
        null,
      );
    } catch (error) {
      throw new Error(`Falha ao obter dados de previsão: ${error.message}`);
    }
  }
}

module.exports = ClimateService;
