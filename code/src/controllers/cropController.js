const CropService = require("../services/cropService");

class CropController {
  static async create(req, res) {
    /* #swagger.tags = ['Crops']
       #swagger.summary = 'Cadastrar cultura'
       #swagger.description = 'Cria uma nova cultura agrícola no sistema.'

       #swagger.security = [{
          "bearerAuth": []
       }]

       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Dados da cultura',
          required: true,
          schema: {
            name: "Milho",
            scientific_name: "Zea mays",
            technical_info: "Cultura adaptada a clima tropical."
          }
       }

       #swagger.responses[201] = {
          description: 'Cultura criada com sucesso'
       }

       #swagger.responses[400] = {
          description: 'Erro de validação'
       }
    */

    try {
      const crop = await CropService.create(req.body);
      return res.status(201).json(crop);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  static async findAll(req, res) {
    /* #swagger.tags = ['Crops']
       #swagger.summary = 'Listar culturas'
       #swagger.description = 'Retorna todas as culturas cadastradas.'

       #swagger.security = [{
          "bearerAuth": []
       }]

       #swagger.responses[200] = {
          description: 'Lista de culturas retornada com sucesso'
       }

       #swagger.responses[500] = {
          description: 'Erro interno do servidor'
       }
    */

    try {
      const crops = await CropService.findAll();
      return res.json(crops);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  static async findById(req, res) {
    /* #swagger.tags = ['Crops']
       #swagger.summary = 'Buscar cultura por ID'
       #swagger.description = 'Retorna os dados de uma cultura específica.'

       #swagger.security = [{
          "bearerAuth": []
       }]

       #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID da cultura',
          required: true,
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000'
       }

       #swagger.responses[200] = {
          description: 'Cultura encontrada com sucesso'
       }

       #swagger.responses[404] = {
          description: 'Cultura não encontrada'
       }
    */

    try {
      const { id } = req.params;

      const crop = await CropService.findById(id);

      return res.json(crop);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  }
}

module.exports = CropController;
