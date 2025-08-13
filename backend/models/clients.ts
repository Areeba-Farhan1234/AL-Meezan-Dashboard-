import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  vat_number: string;
  ct_number: string;
  password: string;
  entity_type: string;
  business_type: string;
  emirates: string;
  location: string;
  upcoming_due: string;
  company: string;
  ct_due_date: string;
  vat_due_date: string;
  trade_licence_expiry: string;
  passport_expiry: string;
  emirate_id_expiry: string;
  contact_number: string;
  address: string;
  revenue: {
    month: string;
    amount: number;
  }[];
  uploadedFiles?: string[];
  createdAt?: Date;
  status: string;
}

const clientSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    vat_number: { type: String },
    ct_number: { type: String },
    password: { type: String },
    entity_type: { type: String },
    business_type: { type: String },
    emirates: { type: String },
    location: { type: String },
    upcoming_due: { type: String },
    company: { type: String },
    ct_due_date: { type: String },
    vat_due_date: { type: String },
    trade_licence_expiry: { type: String },
    passport_expiry: { type: String },
    emirate_id_expiry: { type: String },
    revenue: [
      {
        month: { type: String },
        amount: { type: Number },
      },
    ],
    uploadedFiles: [{ type: String }],
    contact_number: { type: String },
    address: { type: String },
    // status: { type: String },
    status: { type: String, default: 'active' },
  },
  { timestamps: true },
);

export default mongoose.model<IClient>('Client', clientSchema);
