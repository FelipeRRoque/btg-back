const PropertyService = require('../services/propertyService');
const ClimateService = require('../services/climateService');
const RecommendationService = require('../services/recommendationService');

class RecommendationController {

    static async getRecommendations(req, res) {
        try {
            const { propertyId } = req.params;

            const properties = await PropertyService.findPropertiesByUser(req.user.id);

            const property = properties.find(
                (p) => String(p.id) === String(propertyId)
            );

            if (!property) {
                return res.status(404).json({
                    error: "Propriedade não encontrada",
                });
            }

            const weatherData = await ClimateService.getForecastData(property);
            const recommendations = await RecommendationService.generateRecommendations(weatherData);

            return res.status(200).json({
                recommendations,
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message,
            });
        }
    }

    static async findByCropId(req, res) {
        try {
            const { id } = req.params;
            const recommendations = await RecommendationService.findByCropId(id);

            return res.json(recommendations);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = RecommendationController;