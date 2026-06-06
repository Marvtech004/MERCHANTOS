import express from 'express';
import {
  getSales,
  getSaleById,
  createSale,
  getSalesSummary
} from '../controllers/saleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getSales);
router.get('/summary', protect, getSalesSummary);
router.get('/:id', protect, getSaleById);
router.post('/', protect, createSale);

export default router;
