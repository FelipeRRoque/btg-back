const UserService = require("../services/userService");
const { USER_ROLES } = require("../utils/constants");

class UserController {
  static async create(req, res) {
    /* 
      #swagger.tags = ['Users']
      #swagger.description = 'Cadastro de novos usuários produtores ou agrônomos.'
      
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados do usuário',
        required: true,
        schema: {
          name: 'João Batista',
          email: 'joao@email.com',
          password: '123456',
          role: 'produtor',
          age: 52,
          gender: 'Masculino',
          education_level: 'Ensino Fundamental'
        }
      }

      #swagger.responses[201] = {
        description: 'Usuário criado com sucesso',
        schema: {
          id: 'uuid',
          name: 'João Batista',
          email: 'joao@email.com',
          role: 'produtor'
        }
      }

      #swagger.responses[400] = {
        description: 'Erro de validação'
      }

      #swagger.responses[403] = {
        description: 'Criação de administrador não permitida'
      }
    */

    try {
      const { role } = req.body;

      if (role === USER_ROLES.ADMIN) {
        return res.status(403).json({
          error:
            "Acesso negado: Criação de administradores não permitida por via pública.",
        });
      }

      const user = await UserService.create(req.body);

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async findAll(req, res) {
    /* 
      #swagger.tags = ['Users']
      #swagger.description = 'Lista todos os usuários cadastrados. Apenas administradores podem acessar.'
      
      #swagger.security = [{
        "bearerAuth": []
      }]

      #swagger.responses[200] = {
        description: 'Lista de usuários retornada com sucesso'
      }

      #swagger.responses[403] = {
        description: 'Acesso restrito a administradores'
      }
    */

    try {
      if (req.user.role !== USER_ROLES.ADMIN) {
        return res
          .status(403)
          .json({ error: "Acesso restrito a administradores." });
      }

      const users = await UserService.findAll();
      return res.json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro interno ao buscar usuários." });
    }
  }

  static async findById(req, res) {
    /* 
      #swagger.tags = ['Users']
      #swagger.description = 'Busca os dados de um usuário específico.'
      
      #swagger.security = [{
        "bearerAuth": []
      }]

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        description: 'Usuário encontrado com sucesso'
      }

      #swagger.responses[403] = {
        description: 'Acesso negado'
      }

      #swagger.responses[404] = {
        description: 'Usuário não encontrado'
      }
    */

    try {
      const { id } = req.params;

      if (req.user.id !== id && req.user.role !== USER_ROLES.ADMIN) {
        return res.status(403).json({
          error: "Acesso negado: você só pode visualizar seu próprio perfil.",
        });
      }

      const user = await UserService.findById(id);
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async update(req, res) {
    /* 
      #swagger.tags = ['Users']
      #swagger.description = 'Atualiza os dados de um usuário.'
      
      #swagger.security = [{
        "bearerAuth": []
      }]

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'string'
      }

      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados para atualização',
        required: true,
        schema: {
          name: 'João Atualizado',
          password: 'novaSenha123'
        }
      }

      #swagger.responses[200] = {
        description: 'Usuário atualizado com sucesso'
      }

      #swagger.responses[403] = {
        description: 'Permissão insuficiente'
      }

      #swagger.responses[400] = {
        description: 'Erro ao atualizar usuário'
      }
    */

    try {
      const { id } = req.params;

      if (req.user.id !== id && req.user.role !== USER_ROLES.ADMIN) {
        return res.status(403).json({
          error: "Acesso negado: você não pode alterar dados de outro usuário.",
        });
      }

      if (
        req.body.role === USER_ROLES.ADMIN &&
        req.user.role !== USER_ROLES.ADMIN
      ) {
        return res.status(403).json({
          error:
            "Você não tem permissão para alterar cargos para Administrador.",
        });
      }

      const result = await UserService.update(id, req.body);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    /* 
      #swagger.tags = ['Users']
      #swagger.description = 'Remove um usuário do sistema.'
      
      #swagger.security = [{
        "bearerAuth": []
      }]

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        description: 'Usuário removido com sucesso'
      }

      #swagger.responses[403] = {
        description: 'Permissão insuficiente'
      }

      #swagger.responses[400] = {
        description: 'Erro ao remover usuário'
      }
    */

    try {
      const { id } = req.params;

      if (req.user.id !== id && req.user.role !== USER_ROLES.ADMIN) {
        return res.status(403).json({
          error:
            "Acesso negado: permissão insuficiente para excluir este usuário.",
        });
      }

      const result = await UserService.delete(id);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
