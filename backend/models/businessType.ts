import mongoose, { Schema, Document } from 'mongoose';

export interface IBusinessType extends Document {
  name: string;
}

const businessTypeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const BusinessType = mongoose.model<IBusinessType>('BusinessType', businessTypeSchema);

export default BusinessType;
