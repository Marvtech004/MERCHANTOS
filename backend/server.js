import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { connectDb } from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

let dbConnected = false;

connectDb().then((connected) => {
  dbConnected = connected;
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Merchant OS backend', dbConnected });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/ai', aiRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Merchant OS backend running on port ${port}`);
});
