// const express = require('express');
// const router = express.Router();
// const Client = require('../models/Client');

// router.get('/dashboard', async (req, res) => {
//   try {
//     const clients = await Client.find();
//     res.json(clients);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const newClient = new Client(req.body);
//     const saved = await newClient.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: 'Error saving client' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// GET all clients (for dashboard)
router.get('/dashboard', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a new client
router.post('/', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const saved = await newClient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Error saving client' });
  }
});

// DELETE all clients
// DELETE single client by ID
router.delete('/:id', async (req, res) => {
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

module.exports = router;
