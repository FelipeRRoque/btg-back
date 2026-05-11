const express = require('express');

const router = express.Router();

const cultureController = require('../controllers/cultureController');

router.post('/', cultureController.create);

router.get('/', cultureController.getAll);

router.get('/:id', cultureController.getById);

router.put('/:id', cultureController.update);

router.delete('/:id', cultureController.remove);

module.exports = router;