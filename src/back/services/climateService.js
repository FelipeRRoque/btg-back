const { PropertyService } = require("./propertyService"); 

const { ClimateHistory, DailyClimate } = require("../models/dtos/climateDTOs");

class ClimateService {
  /**
   * Busca dados históricos na Open-Meteo e retorna objetos estruturados (DTOs).
   * @param {property} property - Objeto da propriedade (UUID).
   */
  static async getHistoricalData(property) {

    const startDate = '2010-01-01'; 

    const endDate = new Date().toISOString().split('T')[0];

    try {
      if (!property) {
        throw new Error("Propriedade não encontrada");
      }

      const baseUrl = 'https://archive-api.open-meteo.com/v1/archive';
      const params = new URLSearchParams({
        latitude: property.latitude,
        longitude: property.longitude,
        start_date: startDate,
        end_date: endDate,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
        timezone: 'America/Sao_Paulo'
      });

      const response = await fetch(`${baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Erro na API Open-Meteo: Status ${response.status}`);
      }

      const rawData = await response.json();

      const dailyRecords = rawData.daily.time.map((dateStr, index) => {
        return new DailyClimate(
          dateStr,
          rawData.daily.temperature_2m_max[index],
          rawData.daily.temperature_2m_min[index],
          rawData.daily.precipitation_sum[index]
        );
      });

      return new ClimateHistory(
        property.id,
        startDate,
        endDate,
        dailyRecords
      );

    } catch (error) {
      throw new Error(`Falha ao obter histórico climático: ${error.message}`);
    }
  }
}

module.exports = ClimateService;