const PropertyService = require('../services/propertyService');
const ClimateService = require('../services/climateService');
const RecommendationService = require('../services/recommendationService');
const { ca } = require('zod/v4/locales');

class RecommendationController {
    static async getRecommendations(req, res) {
        try {
            const { propertyId } = req.params;
            const properties = await PropertyService.findPropertiesByUser(req.user.id);
            const property = properties.find(p => p.id === propertyId);

            if (!property) {
                return res.status(404).json({ error: 'Propriedade não encontrada' });
            }

            const weartherData = await ClimateService.getForecastData(property);
            const recommendations = await RecommendationService.generateRecommendations(weartherData);

            return res.status(200).json({ recommendations });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RecommendationController;