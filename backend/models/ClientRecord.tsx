// models/ClientRecord.ts (using TypeScript with Mongoose)
import mongoose from 'mongoose';

const MonthlySchema = new mongoose.Schema({
  month: String,
  salary: Number,
  purchase: Number,
}, { _id: false });

const ClientRecordSchema = new mongoose.Schema({
  code: String,
  client: String,
  priority: String,
  status: String,
  person: String,
  monthlyData: [MonthlySchema],
  imports: String,
  exports: String,
  backOfficeComments: String,
  frontOfficeRemarks: String,
  trnNo: String,
  gibanNo: String,
  userId: String,
  password: String,
  expiredDocuments: String,
  tlExpiryDate: String,
  salesSeries: String,
  clientNotes: String,
}, { timestamps: true });

export default mongoose.model('ClientRecord', ClientRecordSchema);
