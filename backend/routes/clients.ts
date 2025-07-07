import express, { Request, Response } from 'express';
import Client from '../models/Clients';

const router = express.Router();

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
