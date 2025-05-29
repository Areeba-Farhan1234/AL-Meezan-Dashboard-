const express = require('express');
const router = express.Router();
const vat = require('../models/vatclients');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

// GET dashboard clients
router.get('/dashboard', async (req, res) => {
  try {
    const clients = await vat.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a new client
router.post('/', async (req, res) => {
  try {
    const newClient = new vat(req.body);
    const saved = await newClient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Error saving client' });
  }
});

// EXPORT CSV
router.get('/export/csv', async (req, res) => {
  try {
    const clients = await vat.find();
    const parser = new Parser();
    const csv = parser.parse(clients);
    res.header('Content-Type', 'text/csv');
    res.attachment('clients.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Error generating CSV' });
  }
});

// EXPORT PDF
router.get('/export/pdf', async (req, res) => {
  try {
    const clients = await vat.find();
    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename=clients.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    clients.forEach((client, i) => {
      doc.text(`${i + 1}. ${client.clientname} (${client.email}) - ${client.threshold}`);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: 'Error generating PDF' });
  }
});

module.exports = router;
