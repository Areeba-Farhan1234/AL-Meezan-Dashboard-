// const mongoose = require('mongoose');

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

// module.exports = mongoose.model('Client', clientSchema);

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
}

const clientSchema: Schema = new Schema({
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
});

export default mongoose.model<IClient>('Client', clientSchema);
