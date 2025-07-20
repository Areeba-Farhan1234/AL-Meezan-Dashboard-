import mongoose, { Schema, Document } from 'mongoose';

export interface IVATclient extends Document {
  clientname: string;
  threshold?: string;
  approvaldate?: Date;
  docstatus?: string;
  returnperiod?: string;
  email?: string;
  password?: string;
  comment?: string;
  theme?: string;
  entity_type: string;
  vatname?: string;
}

const VATclientSchema = new Schema<IVATclient>(
  {
    clientname: { type: String, required: true },
    threshold: { type: String },
    approvaldate: { type: Date },
    docstatus: { type: String },
    returnperiod: { type: String },
    email: { type: String },
    password: { type: String },
    comment: { type: String },
    theme: { type: String },
    entity_type: { type: String, required: true },
    vatname: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IVATclient>('VATclient', VATclientSchema);
