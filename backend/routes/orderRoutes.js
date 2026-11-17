const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { protectSession } = require('../middleware/authMiddleware');

router.post('/create', protectSession, createOrder);
router.get('/my-orders', protectSession, getMyOrders);

module.exports = router;
