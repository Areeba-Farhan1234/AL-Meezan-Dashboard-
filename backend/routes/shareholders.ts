// import express, { Request, Response } from 'express';
// import Shareholder from '../models/Shareholder';

// const router = express.Router();

// // Get all shareholders
// // router.get('/', async (_req: Request, res: Response) => {
// //   try {
// //     const data = await Shareholder.find();
// //     res.json(data);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error });
// //   }
// // });

// // GET shareholders by clientId
// router.get('/:clientId', async (req, res) => {
//   try {
//     const shareholders = await Shareholder.find({ clientId: req.params.clientId });
//     res.json(shareholders);
//   } catch (err) {
//     console.error('Error fetching shareholders:', err);
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// });

// // Add multiple shareholders
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const { shareholders } = req.body;

//     if (!Array.isArray(shareholders) || shareholders.length === 0) {
//       return res.status(400).json({ message: 'Shareholders array is required' });
//     }

//     const saved = await Shareholder.insertMany(
//       shareholders.map((sh) => ({
//         name: sh.name,
//         id: sh.id,
//         expiry: sh.expiry,
//       })),
//     );

//     res.status(201).json({ message: 'Shareholders saved', shareholders: saved });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Delete shareholder by ID
// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     await Shareholder.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Shareholder deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// export default router;

// import express from 'express';
// import Shareholder from '../models/Shareholder';

// const router = express.Router();

// // GET - all shareholders of a client
// router.get('/:clientId', async (req, res) => {
//   try {
//     const shareholders = await Shareholder.find({ clientId: req.params.clientId });
//     res.json(shareholders);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching shareholders', error: err });
//   }
// });

// // POST - overwrite shareholders list for a client
// router.post('/:clientId', async (req, res) => {
//   try {
//     const { clientId } = req.params;
//     const shareholders = req.body; // Array of {name, id, expiry}

//     // Remove old shareholders of this client
//     await Shareholder.deleteMany({ clientId });

//     // Insert new shareholders
//     const inserted = await Shareholder.insertMany(
//       shareholders.map((s: any) => ({ ...s, clientId })),
//     );

//     res.json(inserted);
//   } catch (err) {
//     res.status(500).json({ message: 'Error saving shareholders', error: err });
//   }
// });

// export default router;

import express from 'express';
import Shareholder from '../models/Shareholder';

const router = express.Router();

// GET - all shareholders of a client
router.get('/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const shareholders = await Shareholder.find({ clientId });
    res.json(shareholders);
  } catch (err) {
    console.error('Error fetching shareholders:', err);
    res.status(500).json({ message: 'Error fetching shareholders', error: err });
  }
});

// POST - overwrite shareholders list for a client
router.post('/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const shareholders = req.body; // Expected: array of { name, id, expiry }

    if (!Array.isArray(shareholders)) {
      return res.status(400).json({ message: 'Shareholders must be an array' });
    }

    // Remove old shareholders of this client
    await Shareholder.deleteMany({ clientId });

    // Insert new shareholders with clientId attached
    const inserted = await Shareholder.insertMany(
      shareholders.map((s: any) => ({ ...s, clientId })),
    );

    res.status(201).json(inserted);
  } catch (err) {
    console.error('Error saving shareholders:', err);
    res.status(500).json({ message: 'Error saving shareholders', error: err });
  }
});

export default router;
