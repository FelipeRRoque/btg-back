const express = require('express');

const router = express.Router();

const climaticEventController = require('../controllers/climaticEventController');

router.post('/', climaticEventController.create);

router.get('/', climaticEventController.getAll);

router.get('/:id', climaticEventController.getById);

router.put('/:id', climaticEventController.update);

router.delete('/:id', climaticEventController.remove);

module.exports = router;