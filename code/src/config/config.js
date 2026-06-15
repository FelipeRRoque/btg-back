require("dotenv").config();

const requiredEnvVars = [
  "DB_NAME",
  "DB_USER",
  "DB_PASS",
  "DB_HOST",
];

const missingEnvVars = requiredEnvVars.filter(
  (envName) => !process.env[envName]
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Variáveis de ambiente ausentes para conexão com o banco: ${missingEnvVars.join(", ")}`
  );
}

const databaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  dialect: "postgres",

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("SSL habilitado: true");

module.exports = {
  development: databaseConfig,
  test: databaseConfig,
  production: databaseConfig,
};