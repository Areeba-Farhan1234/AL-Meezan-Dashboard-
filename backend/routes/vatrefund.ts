// routes/vatRefund.js
import express from 'express';
import VatRefund from '../models/VATrefund';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

const router = express.Router();

// GET all VAT refund records
router.get('/', async (req, res) => {
  try {
    const clients = await VatRefund.find();
    res.json(clients);
  } catch (err) {
    console.error('Error fetching VAT refund clients:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new VAT refund record
router.post('/', async (req, res) => {
  try {
    const newClient = new VatRefund(req.body);
    const saved = await newClient.save();
    res.status(201).json(saved); // No need to wrap in []
  } catch (err) {
    console.error('Error saving VAT refund client:', err);
    res.status(400).json({ error: 'Failed to save client' });
  }
});

// Export all records as CSV
router.get('/export/csv', async (req, res) => {
  try {
    const clients = await VatRefund.find();
    const parser = new Parser();
    const csv = parser.parse(clients);
    res.header('Content-Type', 'text/csv');
    res.attachment('vatrefund.csv');
    res.send(csv);
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).json({ error: 'Error generating CSV' });
  }
});

// Export all records as PDF
router.get('/export/pdf', async (req, res) => {
  try {
    const clients = await VatRefund.find();
    const doc = new PDFDocument({ margin: 30 });

    res.setHeader('Content-disposition', 'attachment; filename=vatrefund.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(16).text('VAT Refund Clients List\n', { underline: true });

    clients.forEach((client, i) => {
      doc
        .fontSize(12)
        .text(
          `${i + 1}. ${client.clientname} (${client.email})\n` +
            `   Refund Period: ${client.refundperiod}\n` +
            `   Amount: ${client.refundamount}\n` +
            `   Status: ${client.status}, Submitted: ${client.applicationsubmission}, Approved: ${client.approvaldate}\n\n`,
        );
    });

    doc.end();
  } catch (err) {
    console.error('PDF export error:', err);
    res.status(500).json({ error: 'Error generating PDF' });
  }
});

export default router;
