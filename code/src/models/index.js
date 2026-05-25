"use strict";

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const db = {};

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

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    dialect: "postgres",
    logging: false,
    dialectOptions: isAzurePostgres
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  }
);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;