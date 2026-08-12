const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  getAllBeverages,
  getBeverageById,
  createBeverage,
  updateBeverage,
  deleteBeverage
} = require('../controllers/beverageController');

router.get('/', verifyToken, getAllBeverages);
router.get('/:id', verifyToken, getBeverageById);
router.post('/', verifyToken, createBeverage);
router.put('/:id', verifyToken, updateBeverage);
router.delete('/:id', verifyToken, deleteBeverage);

module.exports = router;
