// routes/clientRecords.ts
import express from 'express';
import ClientRecord from '../models/ClientRecord.ts';

const router = express.Router();

// POST: Create a record
router.post('/', async (req, res) => {
  try {
    const newRecord = new ClientRecord(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: All records with last 3 months data only
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const lastThreeMonths = Array.from({ length: 3 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return date.toLocaleString('default', { month: 'short' });
    });

    const records = await ClientRecord.find();

    const filteredRecords = records.map((record: any) => {
      const filteredMonthlyData = record.monthlyData.filter((entry: any) =>
        lastThreeMonths.includes(entry.month)
      );

      return {
        ...record.toObject(),
        monthlyData: filteredMonthlyData,
      };
    });

    res.json(filteredRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
