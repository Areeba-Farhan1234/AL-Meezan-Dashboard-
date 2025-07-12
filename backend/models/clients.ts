// import mongoose, { Document, Schema } from 'mongoose';

// export interface IClient extends Document {
//   name: string;
//   email: string;
//   vat_number: string;
//   ct_number: string;
//   password: string;
//   entity_type: string;
//   business_type: string;
//   emirates: string;
//   location: string;
//   upcoming_due: string;
//   createdAt?: Date;
// }

// const clientSchema: Schema = new Schema({
//   name: { type: String },
//   email: { type: String },
//   vat_number: { type: String },
//   ct_number: { type: String },
//   password: { type: String },
//   entity_type: { type: String },
//   business_type: { type: String },
//   emirates: { type: String },
//   location: { type: String },
//   upcoming_due: { type: String },
// });

// export default mongoose.model<IClient>('Client', clientSchema);

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
  password_expiry: string;
  emirate: string;
  contact_number: string;
  address: string;
  createdAt?: Date;
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
    password_expiry: { type: String },
    emirate: { type: String },
    contact_number: { type: String },
    address: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IClient>('Client', clientSchema);
