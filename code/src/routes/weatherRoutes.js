const express = require('express');
const router = express.Router();

const WeatherController = require('../controllers/weatherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/weather/current/:id', authMiddleware, WeatherController.getCurrentWeatherByProperty);

router.get('/weather/forecast/:id', authMiddleware, WeatherController.getForecastByProperty);

module.exports = router;