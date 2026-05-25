require("dotenv").config();

const requiredEnvVars = ["DB_NAME", "DB_USER", "DB_PASS", "DB_HOST"];

const missingEnvVars = requiredEnvVars.filter((envName) => {
  return !process.env[envName];
});

if (missingEnvVars.length > 0) {
  throw new Error(
    `Variáveis de ambiente ausentes para conexão com o banco: ${missingEnvVars.join(", ")}`
  );
}

const isAzurePostgres = String(process.env.DB_HOST).includes("postgres.database.azure.com");

const databaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  dialect: "postgres",
  dialectOptions: isAzurePostgres
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
};

module.exports = {
  development: databaseConfig,
  test: databaseConfig,
  production: databaseConfig,
};