require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

// 1. Importa as rotas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// 2. Registra as rotas (A ordem aqui importa)
app.use('/api', userRoutes);
app.use('/api', authRoutes); // Isso registra o /api/login

// 3. Teste de Conexão
sequelize.authenticate()
  .then(() => console.log('🚀 Conectado ao PostgreSQL no Azure!'))
  .catch(err => console.error('❌ Erro de conexão:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});