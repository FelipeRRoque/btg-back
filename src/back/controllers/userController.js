const UserService = require('../services/userService');

class UserController {

  static async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso restrito a administradores.' });
        }
        const users = await UserService.findAll();
        return res.json(users);
        } catch (error) {
          return res.status(500).json({ error: error.message });
          }
        }
        
  static async findById(req, res) {
    try {
      const user = await UserService.findById(req.params.id);
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

static async update(req, res) {
    try {
        const { id } = req.params;
        if (req.user.id !== id && req.user.role !== 'admin') {
            return res.status(403).json({
                error: 'Acesso negado: você não pode alterar dados de outro usuário.'
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
      const result = await UserService.delete(req.params.id);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;