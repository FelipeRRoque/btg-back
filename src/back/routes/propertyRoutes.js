const express = require('express');
const router = express.Router();

const PropertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { propertyCreateSchema, plantingAreaCreateSchema } = require('../schemas/propertySchema');

// Rotas de Propriedade
router.post('/properties', authMiddleware, validate(propertyCreateSchema), PropertyController.createProperty);
router.get('/properties', authMiddleware, PropertyController.getMyProperties);

// Rotas de Área de Plantio
router.post('/planting-areas', authMiddleware, validate(plantingAreaCreateSchema), PropertyController.createPlantingArea);

module.exports = router;