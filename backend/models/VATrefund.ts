import mongoose from 'mongoose';
const vatrefundSchema = new mongoose.Schema({
  clientname: String,
  refundperiod: String,
  refundamount: String,
  status: String,
  applicationsubmission: String,
  docstatus: String,
  approvaldate: String,
  email: String,
  password: String,
  comment: String,
  date: String,
});

export default mongoose.model('vatrefund', vatrefundSchema);
