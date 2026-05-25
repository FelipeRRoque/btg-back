const express = require("express");
const router = express.Router();

const CropController = require("../controllers/cropController");
const CropHistoryController = require("../controllers/cropHistoryController");
const RecommendationController = require("../controllers/recommendationController");

const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const { cropCreateSchema } = require("../schemas/cropSchema");

router.get("/crops", authMiddleware, CropController.findAll);
router.get("/crops/:id", authMiddleware, CropController.findById);
router.get(
  "/crops/:id/recommendations",
  authMiddleware,
  RecommendationController.findByCropId,
);
router.get("/crops/:id/history", authMiddleware, CropHistoryController.findHistoryById);
router.post("/crops", authMiddleware, validate(cropCreateSchema), CropController.create);

router.get(
  "/planting-areas/:id/history",
  authMiddleware,
  CropHistoryController.findAreaHistory,
);

router.post(
  "/planting-areas/:id/history",
  authMiddleware,
  CropHistoryController.createAreaHistory,
);

router.delete(
  "/planting-areas/:areaId/history/:recordId",
  authMiddleware,
  CropHistoryController.deleteAreaHistoryRecord,
);

module.exports = router;
