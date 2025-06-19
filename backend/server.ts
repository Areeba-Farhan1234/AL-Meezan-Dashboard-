// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const VATRoutes = require('./routes/vat'); // Import routes

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // ✅ Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// app.use('/', VATRoutes);

// // ✅ Client Schema & Routes
// const clientSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   vat_number: String,
//   ct_number: String,
//   password: String,
//   entity_type: String,
//   business_type: String,
//   emirates: String,
//   location: String,
//   upcoming_due: String,
// });

// const Client = mongoose.model('Client', clientSchema);

// app.get('/clients', async (req, res) => {
//   try {
//     const clients = await Client.find();
//     res.json(clients);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/clients', async (req, res) => {
//   try {
//     const newClient = new Client(req.body);
//     const savedClient = await newClient.save();
//     res.status(201).json(savedClient);
//   } catch (err) {
//     res.status(400).json({ message: 'Error saving client' });
//   }
// });

// app.delete('/clients/:id', async (req, res) => {
//   try {
//     const deletedClient = await Client.findByIdAndDelete(req.params.id);
//     if (!deletedClient) {
//       return res.status(404).json({ message: 'Client not found' });
//     }
//     res.status(200).json({ message: 'Client deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete client' });
//   }
// });

// app.patch('/clients/:id', async (req, res) => {
//   try {
//     const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedClient) {
//       return res.status(404).json({ message: 'Client not found' });
//     }
//     res.json(updatedClient);
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating client' });
//   }
// });

// // import VATclient from './models/VATclients';

// const VATclientSchema = new mongoose.Schema({
//   clientname: String,
//   threshold: String,
//   approvaldate: Date,
//   docstatus: String,
//   returnperiod: String,
//   email: String,
//   password: String,
//   comment: String,
//   theme: String,
//   entity_type: String,
//   vatname: String,
// });

// const VATclient = mongoose.model('VATclient', VATclientSchema);

// app.get('/vat', async (req, res) => {
//   try {
//     const data = await VATclient.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/vat', async (req, res) => {
//   try {
//     const newVat = new VATclient(req.body);
//     await newVat.save();
//     res.status(201).json(newVat);
//   } catch (error) {
//     res.status(400).json({ message: 'Error saving VAT client', error });
//   }
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import vatRoutes from './routes/vat';
import clientRoutes from './routes/clients'; // Assuming you created a routes/client.ts

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions,
  )
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Use external routes
app.use('/', vatRoutes); // All VAT routes
app.use('/clients', clientRoutes); // All client routes

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
