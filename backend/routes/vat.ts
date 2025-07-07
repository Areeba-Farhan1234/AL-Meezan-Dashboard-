import express from 'express';
import VATclient from '../models/VATClients';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

const router = express.Router();

// GET all VAT clients
router.get('/', async (req, res) => {
  try {
    const clients = await VATclient.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// CREATE a new client
router.post('/', async (req, res) => {
  try {
    const payload = {
      ...req.body,
      approvaldate: req.body.approvaldate ? new Date(req.body.approvaldate) : undefined,
    };
    const newClient = new VATclient(payload);
    const saved = await newClient.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error saving client' });
  }
});

// UPDATE client by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payload = {
      ...req.body,
      approvaldate: req.body.approvaldate ? new Date(req.body.approvaldate) : undefined,
    };
    const updated = await VATclient.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ error: 'Client not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error updating client' });
  }
});

// DELETE client by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await VATclient.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error deleting client' });
  }
});

// EXPORT CSV
router.get('/export/csv', async (req, res) => {
  try {
    const {
      clientname = '',
      from,
      to,
      reportType,
      range = '3months',
    } = req.query as {
      clientname?: string;
      from?: string;
      to?: string;
      reportType?: string;
      range?: string;
    };

    const filter: any = {
      ...(clientname && { clientname: { $regex: clientname, $options: 'i' } }),
      ...(reportType && { entity_type: reportType }),
    };

    const now = new Date();
    const dateFrom = from
      ? new Date(from)
      : range === '3months'
        ? new Date(new Date().setMonth(now.getMonth() - 3))
        : null;
    const dateTo = to ? new Date(to) : now;

    if (dateFrom) filter.approvaldate = { ...filter.approvaldate, $gte: dateFrom };
    if (dateTo) filter.approvaldate = { ...filter.approvaldate, $lte: dateTo };

    const clients = await VATclient.find(filter).lean();
    const fields = ['clientname', 'email', 'threshold', 'approvaldate', 'entity_type'];
    const parser = new Parser({ fields });
    const csv = parser.parse(clients);

    res.header('Content-Type', 'text/csv');
    res.attachment('clients.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating CSV' });
  }
});

// EXPORT PDF
router.get('/export/pdf', async (req, res) => {
  try {
    const {
      clientname = '',
      from,
      to,
      reportType,
      range = '3months',
    } = req.query as {
      clientname?: string;
      from?: string;
      to?: string;
      reportType?: string;
      range?: string;
    };

    const filter: any = {
      ...(clientname && { clientname: { $regex: clientname, $options: 'i' } }),
      ...(reportType && { entity_type: reportType }),
    };

    const now = new Date();
    const dateFrom = from
      ? new Date(from)
      : range === '3months'
        ? new Date(new Date().setMonth(now.getMonth() - 3))
        : null;
    const dateTo = to ? new Date(to) : now;

    if (dateFrom) filter.approvaldate = { ...filter.approvaldate, $gte: dateFrom };
    if (dateTo) filter.approvaldate = { ...filter.approvaldate, $lte: dateTo };

    const clients = await VATclient.find(filter).lean();

    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename=clients.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    clients.forEach((client, i) => {
      doc.text(`${i + 1}. ${client.clientname} (${client.email}) - ${client.threshold}`);
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating PDF' });
  }
});

export default router;
