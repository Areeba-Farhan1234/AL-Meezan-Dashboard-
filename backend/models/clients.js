const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  vat_number: String,
  ct_number: String,
  password: String,
  entity_type: String,
  business_type: String,
  emirates: String,
  location: String,
  upcoming_due: String,
});

module.exports = mongoose.model('Client', clientSchema);
