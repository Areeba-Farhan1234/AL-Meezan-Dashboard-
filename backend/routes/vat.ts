// const express = require('express');
// const router = express.Router();
// const VATClient = require('../models/VATClients'); // Make sure file is named correctly
// const { Parser } = require('json2csv');
// const PDFDocument = require('pdfkit');

// // GET all VAT clients for dashboard
// router.get('/dashboard', async (req, res) => {
//   try {
//     const clients = await VATClient.find();
//     res.json(clients);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

// // POST a new VAT client
// router.post('/', async (req, res) => {
//   try {
//     const newClient = new VATClient(req.body);
//     const saved = await newClient.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: 'Error saving client' });
//   }
// });

// // EXPORT VAT clients to CSV
// router.get('/export/csv', async (req, res) => {
//   try {
//     const clients = await VATClient.find();
//     const parser = new Parser();
//     const csv = parser.parse(clients);
//     res.header('Content-Type', 'text/csv');
//     res.attachment('clients.csv');
//     res.send(csv);
//   } catch (err) {
//     res.status(500).json({ error: 'Error generating CSV' });
//   }
// });

// // EXPORT VAT clients to PDF
// router.get('/export/pdf', async (req, res) => {
//   try {
//     const clients = await VATClient.find();
//     const doc = new PDFDocument();
//     res.setHeader('Content-Disposition', 'attachment; filename=clients.pdf');
//     res.setHeader('Content-Type', 'application/pdf');
//     doc.pipe(res);

//     clients.forEach((client, i) => {
//       doc.text(`${i + 1}. ${client.vatname} (${client.email}) - ${client.threshold}`);
//     });

//     doc.end();
//   } catch (err) {
//     res.status(500).json({ error: 'Error generating PDF' });
//   }
// });

// module.exports = router;

// import express from 'express';
// const router = express.Router();
// import VATclient from '../models/VATclients';
// const { Parser } = require('json2csv');
// const PDFDocument = require('pdfkit');

// // GET dashboard clients
// router.get('/dashboard', async (req, res) => {
//   try {
//     const clients = await VATclient.find();
//     res.json(clients);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

// // POST a new client
// router.post('/vat', async (req, res) => {
//   try {
//     const newClient = new VATclient(req.body);
//     const saved = await newClient.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: 'Error saving client' });
//   }
// });

// router.get('/export/csv', async (req, res) => {
//   try {
//     const { clientname = '', from, to, reportType, range = '3months' } = req.query;

//     const filter = {
//       ...(clientname && { clientname: { $regex: clientname, $options: 'i' } }),
//       ...(reportType && { entity_type: reportType }),
//     };

//     const now = new Date();
//     const dateFrom = from
//       ? new Date(from)
//       : range === '3months'
//         ? new Date(new Date().setMonth(now.getMonth() - 3))
//         : null;
//     const dateTo = to ? new Date(to) : now;

//     if (dateFrom) {
//       filter.approvaldate = { ...filter.approvaldate, $gte: dateFrom };
//     }
//     if (dateTo) {
//       filter.approvaldate = { ...filter.approvaldate, $lte: dateTo };
//     }

//     const clients = await VATclient.find(filter).lean();
//     const parser = new Parser();
//     const csv = parser.parse(clients);

//     res.header('Content-Type', 'text/csv');
//     res.attachment('clients.csv');
//     res.send(csv);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error generating CSV' });
//   }
// });

// router.get('/export/pdf', async (req, res) => {
//   try {
//     const { clientname = '', from, to, reportType, range = '3months' } = req.query;

//     const filter = {
//       ...(clientname && { clientname: { $regex: clientname, $options: 'i' } }),
//       ...(reportType && { entity_type: reportType }),
//     };

//     const now = new Date();
//     const dateFrom = from
//       ? new Date(from)
//       : range === '3months'
//         ? new Date(new Date().setMonth(now.getMonth() - 3))
//         : null;
//     const dateTo = to ? new Date(to) : now;

//     if (dateFrom) {
//       filter.approvaldate = { ...filter.approvaldate, $gte: dateFrom };
//     }
//     if (dateTo) {
//       filter.approvaldate = { ...filter.approvaldate, $lte: dateTo };
//     }

//     const clients = await VATclient.find(filter).lean();

//     const doc = new PDFDocument();
//     res.setHeader('Content-disposition', 'attachment; filename=clients.pdf');
//     res.setHeader('Content-type', 'application/pdf');
//     doc.pipe(res);

//     clients.forEach((client, i) => {
//       doc.text(`${i + 1}. ${client.clientname} (${client.email}) - ${client.threshold}`);
//     });

//     doc.end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error generating PDF' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const VATclient = require('../models/VATclients');
// const { Parser } = require('json2csv');
// const PDFDocument = require('pdfkit');

// // GET dashboard clients
// router.get('/dashboard', async (req, res) => {
//   try {
//     const clients = await VATclient.find();
//     res.json(clients);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

// // POST a new client
// router.post('/vat', async (req, res) => {
//   try {
//     const newClient = new VATclient(req.body);
//     const saved = await newClient.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: 'Error saving client' });
//   }
// });

// // CSV Export
// router.get('/export/csv', async (req, res) => {
//   try {
//     const { clientname = '', from, to, reportType, range = '3months' } = req.query;
//     const filter = {
//       ...(clientname && { clientname: { $regex: clientname, $options: 'i' } }),
//       ...(reportType && { entity_type: reportType }),
//     };

//     const now = new Date();
//     const dateFrom = from
//       ? new Date(from)
//       : range === '3months'
//         ? new Date(new Date().setMonth(now.getMonth() - 3))
//         : null;
//     const dateTo = to ? new Date(to) : now;

//     if (dateFrom) filter.approvaldate = { ...filter.approvaldate, $gte: dateFrom };
//     if (dateTo) filter.approvaldate = { ...filter.approvaldate, $lte: dateTo };

//     const clients = await VATclient.find(filter).lean();
//     const parser = new Parser();
//     const csv = parser.parse(clients);

//     res.header('Content-Type', 'text/csv');
//     res.attachment('clients.csv');
//     res.send(csv);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error generating CSV' });
//   }
// });

// // PDF Export
// router.get('/export/pdf', async (req, res) => {
//   try {
//     const { clientname = '', from, to, reportType, range = '3months' } = req.query;
//     const filter = {
//       ...(clientname && { clientname: { $regex: clientname, $options: 'i' } }),
//       ...(reportType && { entity_type: reportType }),
//     };

//     const now = new Date();
//     const dateFrom = from
//       ? new Date(from)
//       : range === '3months'
//         ? new Date(new Date().setMonth(now.getMonth() - 3))
//         : null;
//     const dateTo = to ? new Date(to) : now;

//     if (dateFrom) filter.approvaldate = { ...filter.approvaldate, $gte: dateFrom };
//     if (dateTo) filter.approvaldate = { ...filter.approvaldate, $lte: dateTo };

//     const clients = await VATclient.find(filter).lean();
//     const doc = new PDFDocument();
//     res.setHeader('Content-disposition', 'attachment; filename=clients.pdf');
//     res.setHeader('Content-type', 'application/pdf');
//     doc.pipe(res);

//     clients.forEach((client, i) => {
//       doc.text(`${i + 1}. ${client.clientname} (${client.email}) - ${client.threshold}`);
//     });

//     doc.end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error generating PDF' });
//   }
// });

// module.exports = router;

import express, { Request, Response } from 'express';
import VATclient from '../models/VATClients';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

const router = express.Router();

// GET all VAT clients for dashboard
router.get('/vat', async (req: Request, res: Response) => {
  try {
    const clients = await VATclient.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a new VAT client
router.post('/vat', async (req: Request, res: Response) => {
  try {
    const newClient = new VATclient(req.body);
    const saved = await newClient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error saving client' });
  }
});

// CSV Export
router.get('/export/csv', async (req: Request, res: Response) => {
  try {
    const { clientname = '', from, to, reportType, range = '3months' } = req.query;
    const filter: any = {
      ...(clientname && { clientname: { $regex: clientname, $options: 'i' } }),
      ...(reportType && { entity_type: reportType }),
    };

    const now = new Date();
    const dateFrom = from
      ? new Date(from as string)
      : range === '3months'
        ? new Date(new Date().setMonth(now.getMonth() - 3))
        : null;
    const dateTo = to ? new Date(to as string) : now;

    if (dateFrom) filter.approvaldate = { ...filter.approvaldate, $gte: dateFrom };
    if (dateTo) filter.approvaldate = { ...filter.approvaldate, $lte: dateTo };

    const clients = await VATclient.find(filter).lean();
    const parser = new Parser();
    const csv = parser.parse(clients);

    res.header('Content-Type', 'text/csv');
    res.attachment('clients.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Error generating CSV' });
  }
});

// PDF Export
router.get('/export/pdf', async (req: Request, res: Response) => {
  try {
    const { clientname = '', from, to, reportType, range = '3months' } = req.query;
    const filter: any = {
      ...(clientname && { clientname: { $regex: clientname, $options: 'i' } }),
      ...(reportType && { entity_type: reportType }),
    };

    const now = new Date();
    const dateFrom = from
      ? new Date(from as string)
      : range === '3months'
        ? new Date(new Date().setMonth(now.getMonth() - 3))
        : null;
    const dateTo = to ? new Date(to as string) : now;

    if (dateFrom) filter.approvaldate = { ...filter.approvaldate, $gte: dateFrom };
    if (dateTo) filter.approvaldate = { ...filter.approvaldate, $lte: dateTo };

    const clients = await VATclient.find(filter).lean();
    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename=clients.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    clients.forEach((client: any, i: number) => {
      doc.text(`${i + 1}. ${client.clientname} (${client.email}) - ${client.threshold}`);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: 'Error generating PDF' });
  }
});

export default router;
