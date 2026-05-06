require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const app = express();

// IMPORTA ROTAS
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// USA ROTAS
app.use('/api', userRoutes);

// Teste de Conexão com o Banco
sequelize.authenticate()
  .then(() => console.log('🚀 Conectado ao PostgreSQL no Azure!'))
  .catch(err => console.error('❌ Erro de conexão:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});