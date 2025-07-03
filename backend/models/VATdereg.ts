import mongoose from 'mongoose';

const VATderegSchema = new mongoose.Schema(
  {
    clientname: { type: String, required: true },
    BasisofDeregistration: String,
    status: String,
    submissionDate: String,
    email: String,
    password: String,
    comment: String,
    reportType: String,
    entity_type: String,
    fromDate: String,
    toDate: String,
    returnperiod: String,
    approvaldate: Date,
  },
  { timestamps: true },
);

export default mongoose.model('VatDeregistration', VATderegSchema);
