const express = require('express');
const router = express.Router();
const { getTables, updateTableStatus, updateTableCount } = require('../controllers/tableController');

router.get('/', getTables);
router.post('/resize', updateTableCount);
router.patch('/:id', updateTableStatus);

module.exports = router;
