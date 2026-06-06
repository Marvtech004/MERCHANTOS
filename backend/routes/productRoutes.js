import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProducts);
router.get('/low-stock', protect, getLowStockProducts);
router.get('/:id', protect, getProductById);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
