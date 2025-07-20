// import express from 'express';
// import {
//   createKYC,
//   getAllKYC,
//   getKYCById,
//   updateKYC,
//   deleteKYC,
// } from '../controllers/kyc.controller';

// const router = express.Router();

// router.post('/', createKYC);
// router.get('/', getAllKYC);
// router.get('/:id', getKYCById);
// router.put('/:id', updateKYC);
// router.delete('/:id', deleteKYC);

// export default router;

import express from 'express';
import KYC from '../models/Kyc';

const router = express.Router();

// Create new KYC
router.post('/', async (req, res) => {
  try {
    const kyc = await KYC.create(req.body);
    res.status(201).json(kyc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create KYC' });
  }
});

// Get all KYC
router.get('/', async (_req, res) => {
  try {
    const kycs = await KYC.find();
    res.status(200).json(kycs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch KYC' });
  }
});

// Get single KYC
router.get('/:id', async (req, res) => {
  try {
    const kyc = await KYC.findById(req.params.id);
    if (!kyc) return res.status(404).json({ error: 'KYC not found' });
    res.status(200).json(kyc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get KYC' });
  }
});

// Update KYC
router.put('/:id', async (req, res) => {
  try {
    const updated = await KYC.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update KYC' });
  }
});

// Delete KYC
router.delete('/:id', async (req, res) => {
  try {
    await KYC.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'KYC deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete KYC' });
  }
});

export default router;
