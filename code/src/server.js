require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 8080; // Padrão Azure

async function startServer() {
  try {
    // FORÇANDO O SSL VIA CÓDIGO (Garantia de que vai rodar na Azure lendo o Render)
    if (sequelize && sequelize.config) {
      sequelize.config.dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      };
      // Atualiza também os dados dentro do gerenciador de conexões do Sequelize
      if (sequelize.connectionManager && sequelize.connectionManager.config) {
        sequelize.connectionManager.config.dialectOptions = {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        };
      }
    }

    console.log(`🔄 Tentando autenticar no banco: ${sequelize.config.host}...`);
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`🚀 Conectado ao PostgreSQL em: ${sequelize.config.host}`);
      console.log(`🌐 Servidor rodando na porta: ${PORT}`);
      console.log(`📚 Docs: http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

startServer();