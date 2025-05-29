// models/VATClient.js
import mongoose from "mongoose";

const VATclientSchema = new mongoose.Schema({
  vatname: String,
  threshold: String,
  docstatus: String,
  approvaldate: String,
  returnperiod: String,
  email: String,
  password: String,
  comment: String,
  entity_type: { type: String, required: true },
});

const VATClient = mongoose.model("VATClient", VATclientSchema);

export default VATClient;
