import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());

app.use(express.json());

// ✅ Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected');

    // ====== Start Server after DB connected ======
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// ====== Schemas and Models ======

// VAT Registration
const vatSchema = new mongoose.Schema(
  {
    clientname: String,
    threshold: String,
    docstatus: String,
    returnperiod: String,
    email: String,
    password: String,
    comment: String,
    entity_type: String,
  },
  { timestamps: true },
);

const VatClient = mongoose.model('VatClient', vatSchema);

// VAT De-registration
const vatDeregistrationSchema = new mongoose.Schema(
  {
    clientname: String,
    reportType: String,
    fromDate: String,
    toDate: String,
    threshold: String,
    docstatus: String,
    returnperiod: String,
    email: String,
    password: String,
    comment: String,
    date: String, // used for filtering/report display
  },
  { timestamps: true },
);

const VatDeregistration = mongoose.model('VatDeregistration', vatDeregistrationSchema);

// VAT Refund Reports
const reportSchema = new mongoose.Schema(
  {
    clientname: String,
    status: String, // Submitted, Approved, Rejected
    refundamount: String,
    applicationsubmission: String, // ISO string date
  },
  { timestamps: true },
);

const Report = mongoose.model('Report', reportSchema);

// ====== Routes ======

// VAT Client Registration Routes
app.get('/vat', async (req, res) => {
  try {
    const data = await VatClient.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/vat', async (req, res) => {
  try {
    const newClient = new VatClient(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: 'Error saving client', error });
  }
});

// VAT De-registration Submission
app.post('/vat-deregistration', async (req, res) => {
  try {
    const {
      clientname,
      reportType,
      fromDate,
      toDate,
      threshold,
      docstatus,
      returnperiod,
      email,
      password,
      comment,
    } = req.body;

    const date = new Date().toISOString().split('T')[0];

    const newEntry = new VatDeregistration({
      clientname,
      reportType: reportType || 'VAT',
      fromDate,
      toDate,
      threshold,
      docstatus,
      returnperiod,
      email,
      password,
      comment,
      date,
    });

    await newEntry.save();

    res.status(200).json([
      {
        clientname,
        reportType: reportType || 'VAT',
        date,
        status: docstatus || 'Draft',
      },
    ]);
  } catch (error) {
    console.error('Error in /vat-deregistration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// VAT Refund Reports Fetch (for filtering/reporting)
app.get('/api/reports', async (req, res) => {
  const { client, type, from, to } = req.query;

  let filter = {};

  if (client) {
    filter.clientname = { $regex: client, $options: 'i' };
  }

  if (type) {
    filter.status = type;
  }

  if (from || to) {
    const dateFilter = {};
    if (from && !isNaN(Date.parse(from))) dateFilter.$gte = new Date(from);
    if (to && !isNaN(Date.parse(to))) dateFilter.$lte = new Date(to);
    if (Object.keys(dateFilter).length > 0) {
      filter.applicationsubmission = dateFilter;
    }
  }

  try {
    const reports = await Report.find(filter);
    res.json(reports);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Failed to fetch reports', details: err.message });
  }
});
