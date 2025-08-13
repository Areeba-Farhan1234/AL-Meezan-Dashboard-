import express, { Request, Response } from 'express';
import BusinessType from '../models/businessType';

const router = express.Router();

// GET all business types
router.get('/', async (_req: Request, res: Response) => {
  try {
    const types = await BusinessType.find().sort({ createdAt: -1 });
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch business types' });
  }
});

// POST a new business type
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: 'Name is required' });

    const existing = await BusinessType.findOne({ name });
    if (existing) return res.status(400).json({ error: 'Business type already exists' });

    const newType = new BusinessType({ name });
    await newType.save();

    res.status(201).json(newType);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save business type' });
  }
});

export default router;
