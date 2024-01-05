const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authenticateToken = require('../utils/authMiddleware');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/all/:clientId', authenticateToken, reportController.getAllClientReports);
router.post('/create', authenticateToken, upload.single('image'), reportController.createReport);
router.get('/:reportId', authenticateToken, reportController.getReport);
router.post('/:reportId/add-comment', authenticateToken, reportController.addCommentToReport);

module.exports = router;