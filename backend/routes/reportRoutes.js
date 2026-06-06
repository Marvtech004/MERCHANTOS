import express from 'express';
import {
  getReports,
  generateReport
} from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getReports);
router.post('/generate', protect, generateReport);

export default router;
