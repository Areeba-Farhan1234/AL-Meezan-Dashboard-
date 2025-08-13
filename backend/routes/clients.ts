// import express, { Request, Response } from 'express';
// import Client from '../models/Clients';

// const router = express.Router();

// router.get('/', async (_req: Request, res: Response) => {
//   const clients = await Client.find();
//   res.json(clients);
// });

// // POST a new client
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const newClient = new Client(req.body);
//     const saved = await newClient.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: 'Error saving client' });
//   }
// });

// // DELETE a specific client by ID
// router.delete('/:id', async (req: Request, res: Response) => {
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

// export default router;

// import express, { Request, Response } from 'express';
// import Client, { IClient } from '../models/clients';

// const router = express.Router();

// // GET all clients
// router.get('/', async (_req: Request, res: Response) => {
//   try {
//     const clients = await Client.find();
//     res.status(200).json(clients);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch clients' });
//   }
// });

// // POST a new client
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const clientData: Partial<IClient> = req.body;

//     const newClient = new Client(clientData);
//     const savedClient = await newClient.save();

//     res.status(201).json(savedClient);
//   } catch (err) {
//     console.error('Error saving client:', err);
//     res.status(400).json({ error: 'Failed to save client' });
//   }
// });

// // PUT update an existing client
// router.put('/:id', async (req: Request, res: Response) => {
//   try {
//     const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedClient) {
//       return res.status(404).json({ message: 'Client not found' });
//     }

//     res.status(200).json(updatedClient);
//   } catch (error) {
//     console.error('Error updating client:', error);
//     res.status(400).json({ error: 'Failed to update client' });
//   }
// });

// // DELETE a client
// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const deletedClient = await Client.findByIdAndDelete(req.params.id);

//     if (!deletedClient) {
//       return res.status(404).json({ message: 'Client not found' });
//     }

//     res.status(200).json({ message: 'Client deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting client:', error);
//     res.status(500).json({ error: 'Failed to delete client' });
//   }
// });

// export default router;

import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Client, { IClient } from '../models/clients';

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const clientId = req.params.id || 'unknown';
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `client_${clientId}_${base}_${timestamp}${ext}`);
  },
});
const upload = multer({ storage });

// ====== GET all clients ======
router.get('/', async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// ====== POST a new client ======
router.post('/', async (req: Request, res: Response) => {
  try {
    const clientData: Partial<IClient> = req.body;
    const newClient = new Client(clientData);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    console.error('Error saving client:', err);
    res.status(400).json({ error: 'Failed to save client' });
  }
});

// ====== PUT update a client ======
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(400).json({ error: 'Failed to update client' });
  }
});

// ====== DELETE a client ======
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const files = fs.readdirSync(uploadDir);
    files.forEach((file) => {
      if (file.startsWith(`client_${req.params.id}_`)) {
        fs.unlinkSync(path.join(uploadDir, file));
      }
    });

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

// ====== POST Upload file for a client ======
router.post('/:id/upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    client.uploadedFiles = Array.isArray(client.uploadedFiles)
      ? [...client.uploadedFiles, req.file.filename]
      : [req.file.filename];

    await client.save();

    res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save file info to DB', details: err.message });
  }
});

// ====== GET Download latest file for a client ======
router.get('/:id/download', (req: Request, res: Response) => {
  const clientId = req.params.id;
  const files = fs.readdirSync(uploadDir);
  const file = files
    .filter((f) => f.startsWith(`client_${clientId}_`))
    .sort()
    .pop();

  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  const filePath = path.join(uploadDir, file);
  res.download(filePath);
});

export default router;
