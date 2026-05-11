const PropertyService = require("../services/propertyService");

class PropertyController {
  // --- PROPRIEDADES ---

  static async createProperty(req, res) {
    /* #swagger.tags = ['Properties']
       #swagger.summary = 'Cadastrar propriedade'
       #swagger.description = 'Cria uma nova propriedade vinculada ao usuário autenticado.'

       #swagger.security = [{
          "bearerAuth": []
       }]

       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Dados da propriedade',
          required: true,
          schema: {
            name: "Fazenda Esperança",
            latitude: -19.9191,
            longitude: -43.9386,
            city: "Belo Horizonte",
            state: "MG"
          }
       }

       #swagger.responses[201] = {
          description: 'Propriedade criada com sucesso'
       }

       #swagger.responses[400] = {
          description: 'Erro ao criar propriedade'
       }
    */

    try {
      // req.user.id vem do authMiddleware
      const property = await PropertyService.createProperty(
        req.user.id,
        req.body,
      );

      return res.status(201).json(property);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getMyProperties(req, res) {
    /* #swagger.tags = ['Properties']
       #swagger.summary = 'Listar propriedades do usuário'
       #swagger.description = 'Retorna todas as propriedades cadastradas pelo usuário autenticado.'

       #swagger.security = [{
          "bearerAuth": []
       }]

       #swagger.responses[200] = {
          description: 'Lista de propriedades retornada com sucesso'
       }

       #swagger.responses[500] = {
          description: 'Erro interno do servidor'
       }
    */

    try {
      const properties = await PropertyService.findPropertiesByUser(
        req.user.id,
      );

      return res.json(properties);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // --- ÁREAS DE PLANTIO ---

  static async createPlantingArea(req, res) {
    /* #swagger.tags = ['Planting Areas']
       #swagger.summary = 'Cadastrar área de plantio'
       #swagger.description = 'Cria uma nova área de plantio vinculada a uma propriedade do usuário.'

       #swagger.security = [{
          "bearerAuth": []
       }]

       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Dados da área de plantio',
          required: true,
          schema: {
            property_id: "550e8400-e29b-41d4-a716-446655440000",
            name: "Área Norte",
            size_hectares: 12.5,
            soil_type: "Argiloso"
          }
       }

       #swagger.responses[201] = {
          description: 'Área de plantio criada com sucesso'
       }

       #swagger.responses[400] = {
          description: 'Erro ao criar área de plantio'
       }
    */

    try {
      const plantingArea = await PropertyService.createPlantingArea(
        req.user.id,
        req.body,
      );

      return res.status(201).json(plantingArea);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

module.exports = PropertyController;
