require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const cropRoutes = require("./routes/cropRoutes");
const frontRoutes = require("./routes/frontRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", frontRoutes);

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", propertyRoutes);
app.use("/api", cropRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", weatherRoutes);

module.exports = app;