const { Recommendation, Crop } = require('../models');

class RecommendationService {

    static getCurrentSeason() {
        const month = new Date().getMonth() + 1;

        if ([12, 1, 2].includes(month)) return 'Verão';
        if ([3, 4, 5].includes(month)) return 'Outono';
        if ([6, 7, 8].includes(month)) return 'Inverno';

        return 'Primavera';
    }

    static classifyClimate(weatherData) {
        const temperature = weatherData.current.temperature;
        const precipitation = weatherData.current.precipitation;

        if (temperature >= 24 && precipitation >= 5)
            return 'Quente e chuvoso';

        if (temperature <= 20)
            return 'Frio';

        return 'Ameno';
    }

    static async generateRecommendations(weatherData) {
        const season = this.getCurrentSeason();
        const climateCondition = this.classifyClimate(weatherData);
        const recommendations = await Recommendation.findAll({
            where: {
                target_season: season,
                climate_condition: climateCondition
            },
            include: [
                {
                    model: Crop,
                    as: 'crop'
                }
            ]
        });
        return {
            season,
            climateCondition,
            weather: weatherData.current,
            recommendations
        };
    }

    static async findByCropId(cropId) {
        const crop = await Crop.findByPk(cropId);

        if (!crop) {
            throw new Error('Cultura não encontrada.');
        }

        const recommendations = await Recommendation.findAll({
            where: {
                crop_id: cropId,
            },
            order: [
                ['target_season', 'ASC'],
                ['climate_condition', 'ASC'],
                ['created_at', 'DESC'],
            ],
        });

        return recommendations;
    }
}

module.exports = RecommendationService;