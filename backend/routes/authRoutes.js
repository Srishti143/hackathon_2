const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin, loginCustomer, skipCustomer } = require('../controllers/authController');

router.post('/admin/login', authAdmin);
router.post('/admin/register', registerAdmin);
router.post('/customer/login', loginCustomer);
router.post('/customer/skip', skipCustomer);

module.exports = router;
