require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("🚀 Conectado ao PostgreSQL!");

    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
      console.log(`🌐 Login: http://localhost:${PORT}/login`);
      console.log(`🌐 Home: http://localhost:${PORT}/home`);
      console.log(`📚 Docs: http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

startServer();