import mongoose from 'mongoose';

const VATReportSchema = new mongoose.Schema({
  clientname: String,
  status: String,
  refundamount: String,
  applicationsubmission: String, // store as ISO date string
}, { timestamps: true });

export default mongoose.model('VATReport', VATReportSchema);
