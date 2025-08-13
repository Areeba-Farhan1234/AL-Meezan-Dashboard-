// // server.ts
// import express, { Request, Response, NextFunction } from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import vatRoutes from './routes/vat';
// import clientRoutes from './routes/clients';
// import deregRoutes from './routes/vatdereg';
// import refundRoutes from './routes/vatrefund';
// import documentRoutes from './routes/document';
// import sendEmailRoutes from './routes/sendEmail';
// import kycRoutes from './routes/kyc';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ===== MIDDLEWARE =====
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads')); // To serve static files

// // ===== MONGODB CONNECTION =====
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error('❌ MONGO_URI not found in .env');
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } as mongoose.ConnectOptions)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// // ===== ROUTES =====
// app.use('/vat', vatRoutes);
// app.use('/clients', clientRoutes);
// app.use('/dereg', deregRoutes);
// app.use('/refund', refundRoutes);
// app.use('/documents', documentRoutes);
// app.use('/sendEmail', sendEmailRoutes);
// app.use('/kyc', kycRoutes);

// // ===== NOT FOUND HANDLER =====
// app.use((_req: Request, res: Response) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // ===== START SERVER =====
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';

import vatRoutes from './routes/vat';
import clientRoutes from './routes/clients';
import deregRoutes from './routes/vatdereg';
import refundRoutes from './routes/vatrefund';
import documentRoutes from './routes/document';
import sendEmailRoutes from './routes/sendEmail';
import kycRoutes from './routes/kyc';

import VatClient from './models/VATClients';
import VatDeregistration from './models/VATdereg';
import VatRefund from './models/VATrefund';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ===== MULTER SETUP =====
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (_req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

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
app.use('/kyc', kycRoutes);

// ===== VAT Registration GET & POST =====
app.get('/vat', async (_req: Request, res: Response) => {
  try {
    const data = await VatClient.find();
    res.json(data);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/vat', async (req: Request, res: Response) => {
  try {
    const newClient = new VatClient(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error: any) {
    res.status(400).json({ message: 'Error saving client', error });
  }
});

// ===== VAT Deregistration GET & POST =====
app.get('/vat/vat-deregistration', async (_req: Request, res: Response) => {
  try {
    const data = await VatDeregistration.find();
    res.json(data);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/vat/vat-deregistration', async (req: Request, res: Response) => {
  const { approvaldate } = req.body;

  if (!approvaldate) {
    return res.status(400).json({ message: 'Approval date is required' });
  }

  try {
    const {
      clientname,
      reportType,
      fromDate,
      toDate,
      BasisofDeregistration,
      status,
      returnperiod,
      email,
      password,
      comment,
      entity_type,
    } = req.body;

    const date = new Date().toISOString().split('T')[0];

    const newEntry = new VatDeregistration({
      clientname,
      reportType: reportType || 'VAT',
      fromDate,
      toDate,
      BasisofDeregistration,
      status,
      approvaldate,
      returnperiod,
      email,
      password,
      comment,
      entity_type,
      date,
    });

    await newEntry.save();

    res.status(200).json([{ reportType: reportType || 'VAT', date, status: status || 'Draft' }]);
  } catch (error: any) {
    console.error('Error in /vat-deregistration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// ===== VAT Refund GET & POST =====
app.get('/vatrefund', async (_req: Request, res: Response) => {
  try {
    const data = await VatRefund.find();
    res.json(data);
  } catch (error: any) {
    console.error('Error in GET /vatrefund:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/vatrefund', async (req: Request, res: Response) => {
  const { applicationsubmission } = req.body;

  if (!applicationsubmission) {
    return res.status(400).json({ message: 'applicationsubmission is required' });
  }

  try {
    const {
      clientname,
      refundperiod,
      refundamount,
      status,
      docstatus,
      approvaldate,
      email,
      password,
      comment,
    } = req.body;

    const date = new Date().toISOString().split('T')[0];

    const newRefund = new VatRefund({
      clientname,
      refundperiod,
      refundamount,
      status,
      docstatus,
      applicationsubmission,
      approvaldate,
      email,
      password,
      comment,
      date,
    });

    await newRefund.save();

    res
      .status(200)
      .json([{ clientname, refundperiod, refundamount, status: status || 'Draft', date }]);
  } catch (error: any) {
    console.error('Error in POST /vatrefund:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// ===== NOT FOUND HANDLER =====
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
