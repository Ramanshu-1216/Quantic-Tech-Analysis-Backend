const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../utils/authMiddleware');

router.get('/', authenticateToken, clientController.getAllClients);
router.post('/create', authenticateToken, clientController.createClient);
router.get('/:clientId', authenticateToken, clientController.getClient);

module.exports = router;