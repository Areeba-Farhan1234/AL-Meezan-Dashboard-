// const express = require('express');
// const router = express.Router();
// const Client = require('../models/Client');

// // GET all clients (for dashboard)
// router.get('/dashboard', async (req, res) => {
//   try {
//     const clients = await Client.find();
//     res.json(clients);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

// // POST a new client
// router.post('/', async (req, res) => {
//   try {
//     const newClient = new Client(req.body);
//     const saved = await newClient.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: 'Error saving client' });
//   }
// });

// // DELETE all clients

// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedClient = await Client.findByIdAndDelete(req.params.id);
//     if (!deletedClient) {
//       return res.status(404).json({ message: 'Client not found' });
//     }
//     res.status(200).json({ message: 'Client deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete client' });
//   }
// });

// module.exports = router;

// app.delete('/clients/:id', async (req, res) => {
//   try {
//     const result = await ClientModel.findByIdAndDelete(req.params.id);
//     if (!result) {
//       return res.status(404).send({ message: 'Client not found' });
//     }
//     res.send({ message: 'Client deleted successfully' });
//   } catch (err) {
//     res.status(500).send({ message: 'Error deleting client' });
//   }
// });

import express, { Request, Response } from 'express';
import Client from '../models/clients';

const router = express.Router();

// GET all clients (for dashboard)
// router.get('/dashboard', async (_req: Request, res: Response) => {
//   try {
//     const clients = await Client.find();
//     res.json(clients);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

router.get('/', async (_req: Request, res: Response) => {
  const clients = await Client.find();
  res.json(clients);
});

// POST a new client
router.post('/', async (req: Request, res: Response) => {
  try {
    const newClient = new Client(req.body);
    const saved = await newClient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Error saving client' });
  }
});

// DELETE a specific client by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

export default router;
