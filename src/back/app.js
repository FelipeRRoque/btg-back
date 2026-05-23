require('dotenv').config();

const express = require('express');
const path = require('path');
const sequelize = require('./config/database');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const cropRoutes = require('./routes/cropRoutes');
const frontRoutes = require('./routes/frontRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, 'public')));

// Rotas das páginas HTML
app.use('/', frontRoutes);

// Rotas da API
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', propertyRoutes);
app.use('/api', cropRoutes);
app.use('/api', recommendationRoutes);

// Teste de conexão
sequelize.authenticate()
  .then(() => console.log('🚀 Conectado ao PostgreSQL no Azure!'))
  .catch(err => console.error('❌ Erro de conexão:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Home: http://localhost:${PORT}/home`);
});