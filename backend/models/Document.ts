import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Completed' },
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
