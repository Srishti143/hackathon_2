const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus, getCustomers, getTables } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/orders', protectAdmin, getOrders);
router.patch('/orders/:id', protectAdmin, updateOrderStatus);
router.get('/customers', protectAdmin, getCustomers);
router.get('/tables', protectAdmin, getTables);

module.exports = router;
