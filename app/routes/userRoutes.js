const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../utils/authMiddleware');

router.get('/', authenticateToken, userController.getAllUsers);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
