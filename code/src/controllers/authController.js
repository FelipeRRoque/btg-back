const AuthService = require('../services/authService');

class AuthController {
  static async login(req, res) {
    /* #swagger.tags = ['Auth']
       #swagger.description = 'Endpoint para autenticação de usuários.'
       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Credenciais de acesso',
          required: true,
          schema: { email: "joao@teste.com", password: "123456" }
       }
    */
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return res.json(result);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;