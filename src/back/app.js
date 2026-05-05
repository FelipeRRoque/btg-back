const express = require('express');
const app = express();
const { User } = require('./models'); // Ajuste o caminho para onde estão seus models

// Middleware para entender JSON nas requisições
app.use(express.json());

// ROTA DE TESTE: Listar todos os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
});

// ROTA DE TESTE: Criar um usuário
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});