const express = require("express");
const router = express.Router();

const PropertyController = require("../controllers/propertyController");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const {
  propertyCreateSchema,
  propertyUpdateSchema,
  plantingAreaCreateSchema,
  plantingAreaUpdateSchema,
} = require("../schemas/propertySchema");

// Propriedades
router.post(
  "/properties",
  authMiddleware,
  validate(propertyCreateSchema),
  PropertyController.createProperty
);

router.get(
  "/properties",
  authMiddleware,
  PropertyController.getMyProperties
);

router.put(
  "/properties/:id",
  authMiddleware,
  validate(propertyUpdateSchema),
  PropertyController.updateProperty
);

router.delete(
  "/properties/:id",
  authMiddleware,
  PropertyController.deleteProperty
);

// Áreas de plantio
router.post(
  "/planting-areas",
  authMiddleware,
  validate(plantingAreaCreateSchema),
  PropertyController.createPlantingArea
);

router.put(
  "/planting-areas/:id",
  authMiddleware,
  validate(plantingAreaUpdateSchema),
  PropertyController.updatePlantingArea
);

router.delete(
  "/planting-areas/:id",
  authMiddleware,
  PropertyController.deletePlantingArea
);

module.exports = router;