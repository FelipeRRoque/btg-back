const UserService = require("../services/userService");
const { USER_ROLES } = require("../utils/constants");

class UserController {
  static async create(req, res) {
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
    try {
      const { id } = req.params;

      if (req.user.id !== id && req.user.role !== USER_ROLES.ADMIN) {
        return res
          .status(403)
          .json({
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
        return res
          .status(403)
          .json({
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
    try {
      const { id } = req.params;

      if (req.user.id !== id && req.user.role !== USER_ROLES.ADMIN) {
        return res
          .status(403)
          .json({
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
