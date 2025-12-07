// backend/routes/microtask_routes.js
const express = require('express');
const router = express.Router();
const { enqueueChatProcessing, getTaskStatus } = require('../controllers/microtask_controller');

// POST /api/microtask/process
router.post('/process', enqueueChatProcessing);

// GET /api/microtask/:taskId
router.get('/:taskId', getTaskStatus);

module.exports = router;
