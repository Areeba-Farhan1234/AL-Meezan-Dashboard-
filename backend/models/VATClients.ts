// // models/VATClient.js
// const mongoose = require('mongoose');

// const VATclientSchema = new mongoose.Schema({
//   vatname: String,
//   threshold: String,
//   docstatus: String,
//   approvaldate: String,
//   returnperiod: String,
//   email: String,
//   password: String,
//   comment: String,
//   entity_type: { type: String, required: true },
// });

// const VATClient = mongoose.model('VATClient', VATclientSchema);

// module.exports = VATClient;
// import mongoose from "mongoose";

// const VATclient = new mongoose.Schema({
//   clientname: String,
//   threshold: String,
//   docstatus: String,
//   approvaldate: String,
//   returnperiod: String,
//   email: String,
//   password: String,
//   comment: String,
//   entity_type: { type: String, required: true },
// });

// import mongoose from 'mongoose';
// const VatClient = mongoose.models.VatClient || mongoose.model('VatClient', vatSchema);

// const VATclientSchema = new mongoose.Schema({
//   clientname: String,
//   threshold: String,
//   docstatus: String,
//   approvaldate: { type: Date },
//   returnperiod: String,
//   email: String,
//   password: String,
//   comment: String,
//   entity_type: { type: String, required: true },
// });

// export default mongoose.model('VATclients', VATclientSchema);

// import mongoose from 'mongoose';

// const vatSchema = new mongoose.Schema(
//   {
//     clientname: String,
//     threshold: String,
//     docstatus: String,
//     approvaldate: Date,
//     returnperiod: String,
//     email: String,
//     password: String,
//     comment: String,
//     entity_type: { type: String, required: true },
//   },
//   { timestamps: true },
// );

// export default mongoose.model('VatClient', vatSchema);

// const mongoose = require('mongoose');

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

// module.exports = mongoose.model('VATclient', VATclientSchema);

// const mongoose = require('mongoose');

// const VATclientSchema = new mongoose.Schema({
//   clientname: { type: String, required: true },
//   threshold: { type: String },
//   approvaldate: { type: Date },
//   docstatus: { type: String },
//   returnperiod: { type: String },
//   email: { type: String },
//   password: { type: String },
//   comment: { type: String },
//   theme: { type: String },
//   entity_type: { type: String },
// });

// module.exports = mongoose.model('VATClient', VATclientSchema);

// const mongoose = require('mongoose');

// const VATclientSchema = new mongoose.Schema({
//   clientname: { type: String, required: true },
//   threshold: { type: String },
//   approvaldate: { type: Date },
//   docstatus: { type: String },
//   returnperiod: { type: String },
//   email: { type: String },
//   password: { type: String },
//   comment: { type: String },
//   theme: { type: String },
//   entity_type: { type: String, required: true },
//   vatname: { type: String },
// });

// module.exports = mongoose.model('VATclient', VATclientSchema);

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

const VATclientSchema = new Schema<IVATclient>({
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
});

export default mongoose.model<IVATclient>('VATclient', VATclientSchema);
