// import mongoose, { Schema, Document } from 'mongoose';

// export interface IShareholder extends Document {
//   name: string;
//   id: string;
//   expiry?: Date;
// }

// const ShareholderSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   id: { type: String, required: true },
//   expiry: { type: Date },
// });

// export default mongoose.model<IShareholder>('Shareholder', ShareholderSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IShareholder extends Document {
  clientId: string;
  name: string;
  id: string;
  expiry?: Date;
}

const ShareholderSchema: Schema = new Schema({
  clientId: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: String, required: true },
  expiry: { type: Date, required: false },
});

export default mongoose.model<IShareholder>('Shareholder', ShareholderSchema);
