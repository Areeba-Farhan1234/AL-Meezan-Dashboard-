// import mongoose from 'mongoose';

// const ownerSchema = new mongoose.Schema({
//   name: String,
//   nationality: String,
//   contact: String,
//   email: String,
//   pep: String,
//   isEditing: Boolean,
// });

// const associationSchema = new mongoose.Schema({
//   companyName: String,
//   associationName: String,
//   isEditing: Boolean,
// });

// const regulatoryInfoSchema = new mongoose.Schema({
//   id: Number,
//   description: String,
// });

// const kycSchema = new mongoose.Schema(
//   {
//     name: String,
//     office_no: String,
//     building_name: String,
//     street_address: String,
//     city: String,
//     state: String,
//     country: String,
//     zip: String,
//     telephone_no: String,
//     fax_number: String,
//     email: String,
//     annual_business: String,
//     owners: [ownerSchema],
//     associations: [associationSchema],
//     regulatoryInformation: [regulatoryInfoSchema],
//   },
//   { timestamps: true },
// );

// export default kycSchema;

import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
  name: String,
  nationality: String,
  contact: String,
  email: String,
  pep: String,
  isEditing: Boolean,
});

const associationSchema = new mongoose.Schema({
  companyName: String,
  associationName: String,
  isEditing: Boolean,
});

const regulatoryInfoSchema = new mongoose.Schema({
  id: String,
  description: String,
});

const kycSchema = new mongoose.Schema(
  {
    name: String,
    office_no: String,
    building_name: String,
    street_address: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    telephone_no: String,
    fax_number: String,
    email: String,
    annual_business: String,
    owners: [ownerSchema],
    associations: [associationSchema],
    regulatoryInformation: [regulatoryInfoSchema],
  },
  { timestamps: true },
);

export default mongoose.model('KYC', kycSchema);
