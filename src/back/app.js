require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); // Importa a conexão acima
const app = express();

app.use(express.json());

// Teste de Conexão com o Banco
sequelize.authenticate()
  .then(() => console.log('🚀 Conectado ao PostgreSQL no Azure!'))
  .catch(err => console.error('❌ Erro de conexão:', err));

// Suas rotas virão aqui...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});