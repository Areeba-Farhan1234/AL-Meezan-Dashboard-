// export default router;
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Document from '../models/Document';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: path.resolve('uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
  },
});
const upload = multer({ storage });

// Upload a new document
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const newDoc = await Document.create({
    name: req.file.originalname,
    fileUrl: `/uploads/${req.file.filename}`,
  });

  res.status(201).json(newDoc);
});

// Get all documents
router.get('/', async (_req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 });
  res.json(docs);
});

// Delete a document
router.delete('/:id', async (req, res) => {
  const doc = await Document.findByIdAndDelete(req.params.id);
  if (doc && doc.fileUrl) {
    const filePath = path.resolve('uploads', path.basename(doc.fileUrl));
    fs.unlink(filePath, (err) => {
      if (err) console.warn('File delete error:', err);
    });
  }
  res.json({ success: true });
});

// Update document name
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  const updated = await Document.findByIdAndUpdate(req.params.id, { name }, { new: true });
  res.json(updated);
});

export default router;
