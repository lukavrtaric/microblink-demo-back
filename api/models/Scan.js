const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Scan
let Scan = new Schema({
  secondaryID: {
    type: String,
    required: true
  },
  primaryID: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    required: true
  },
  documentNumber: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    default: null
  },
  sex: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  dateOfExpiry: {
    type: Date,
    default: null
  },
  rawMRZString: {
    type: String,
    required: true
  }
},{
    collection: 'scan'
});

module.exports = mongoose.model('Scan', Scan);