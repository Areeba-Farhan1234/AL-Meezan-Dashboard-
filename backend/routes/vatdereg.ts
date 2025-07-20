// export default router;
import express from 'express';
import VatDeregistration from '../models/VATdereg';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
const router = express.Router();

// GET all deregistered clients
router.get('/', async (req, res) => {
  try {
    const clients = await VatDeregistration.find();
    res.json(clients);
  } catch (err) {
    console.error('Error fetching VAT deregistration list:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a new VAT deregistration record
router.post('/', async (req, res) => {
  try {
    console.log('Incoming payload:', req.body);
    const newClient = new VatDeregistration(req.body);
    const saved = await newClient.save();
    res.status(201).json([saved]); // return array to match frontend expectation
  } catch (err) {
    console.error('Error saving client:', err);
    res.status(400).json({ error: 'Error saving client' });
  }
});
//  UPDATE client by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payload = {
      ...req.body,
      approvaldate: req.body.approvaldate ? new Date(req.body.approvaldate) : null,
    };
    const updated = await VatDeregistration.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ error: 'Client not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Error updating client' });
  }
});

// DELETE client by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await VatDeregistration.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting client' });
  }
});
// EXPORT as CSV
router.get('/export/csv', async (req, res) => {
  try {
    const clients = await VatDeregistration.find();
    const parser = new Parser();
    const csv = parser.parse(clients);

    res.header('Content-Type', 'text/csv');
    res.attachment('VAT_Clients.csv');
    res.send(csv);
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).json({ error: 'Error generating CSV' });
  }
});

// EXPORT as PDF
router.get('/export/pdf', async (req, res) => {
  try {
    const clients = await VatDeregistration.find();
    const doc = new PDFDocument();

    res.setHeader('Content-disposition', 'attachment; filename=VAT_Clients.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    // doc.fontSize(16).text('VAT Deregistration Clients Report\n', { underline: true });

    clients.forEach((client, i) => {
      doc
        .fontSize(12)
        .text(
          `(${i + 1}) - (${client.clientname})  (${client.email}) - ${client.BasisofDeregistration}`,
        );
    });

    doc.end();
  } catch (err) {
    console.error('PDF export error:', err);
    res.status(500).json({ error: 'Error generating PDF' });
  }
});

export default router;
