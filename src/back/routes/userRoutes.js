const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

// CRUD
router.post('/users', UserController.create);
router.get('/users', UserController.findAll);
router.get('/users/:id', UserController.findById);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

module.exports = router;