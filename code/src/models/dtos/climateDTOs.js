class DailyClimate {
  constructor(date, maxTemp, minTemp, precipitation) {
    this.date = date;
    this.maxTemp = maxTemp;
    this.minTemp = minTemp;
    this.precipitation = precipitation;
  }
}

class ClimateHistory {
  constructor(propertyId, startDate, endDate, dailyRecords) {
    this.propertyId = propertyId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.dailyRecords = dailyRecords;
  }
}

class WeatherResponse {
  constructor(latitude, longitude, current, hourly) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.current = current;
    this.hourly = hourly;
  }
}

class CurrentWeather {
  constructor(temperature, precipitation, rain) {
    this.temperature = temperature;
    this.precipitation = precipitation;
    this.rain = rain;
  }
}

class ForecastWeather {
  constructor(date, maxTemp, minTemp, precipitation) {
    this.date = date;
    this.maxTemp = maxTemp;
    this.minTemp = minTemp;
    this.precipitation = precipitation;
  }
}

module.exports = { ClimateHistory, DailyClimate, WeatherResponse, CurrentWeather, ForecastWeather  };
