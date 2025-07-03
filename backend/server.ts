// server.ts
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import vatRoutes from './routes/vat';
import clientRoutes from './routes/clients';
import deregRoutes from './routes/vatdereg';
import refundRoutes from './routes/vatrefund';
import documentRoutes from './routes/document';
import sendEmailRoutes from './routes/sendEmail';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // To serve static files

// ===== MONGODB CONNECTION =====
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ===== ROUTES =====
app.use('/vat', vatRoutes);
app.use('/clients', clientRoutes);
app.use('/dereg', deregRoutes);
app.use('/refund', refundRoutes);
app.use('/documents', documentRoutes);
app.use('/sendEmail', sendEmailRoutes);

// ===== NOT FOUND HANDLER =====
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
