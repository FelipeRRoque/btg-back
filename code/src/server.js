require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`🚀 Conectado ao PostgreSQL em: ${sequelize.config.host}`);
      console.log(`🌐 Home: http://localhost:${PORT}/home`);
      console.log(`📚 Docs: http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

startServer();