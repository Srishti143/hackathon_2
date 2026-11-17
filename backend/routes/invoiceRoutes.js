const express = require('express');
const router = express.Router();
const { createInvoice, payInvoice } = require('../controllers/invoiceController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/create', protectAdmin, createInvoice);
router.patch('/:id/pay', protectAdmin, payInvoice);

module.exports = router;
