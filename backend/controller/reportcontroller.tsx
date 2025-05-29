import { Request, Response } from 'express';
import VATReport from '../models/VATreport';

export const getReports = async (req: Request, res: Response) => {
  const { client, type, from, to } = req.query;

  const filter: any = {};
  if (client) filter.clientname = { $regex: client, $options: 'i' };
  if (type) filter.status = type;
  if (from || to) {
    filter.applicationsubmission = {};
    if (from) filter.applicationsubmission.$gte = new Date(from as string);
    if (to) filter.applicationsubmission.$lte = new Date(to as string);
  }

  try {
    const reports = await VATReport.find(filter);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports' });
  }
};
