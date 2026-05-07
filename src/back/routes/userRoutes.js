const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const validate = require('../middlewares/validateMiddleware');
const { userCreateSchema } = require('../schemas/userSchema');


router.post('/users', validate(userCreateSchema), UserController.create);

router.get('/users', authMiddleware, UserController.findAll);
router.get('/users/:id', authMiddleware, UserController.findById);
router.put('/users/:id', authMiddleware, UserController.update);
router.delete('/users/:id', authMiddleware, UserController.delete);

module.exports = router;