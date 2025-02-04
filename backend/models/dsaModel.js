// Model for DSA
const mongoose = require('mongoose');

// DSA model
const DsaSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
  },
  { timestamps: true }
);
const Dsa = mongoose.model('Dsa', DsaSchema);

// DSA Topics model
const DsaTopicSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'DsaTopic' },
    dsaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dsa' },
  },
  { timestamps: true }
);

const DsaTopic = mongoose.model('DsaTopic', DsaTopicSchema);

module.exports = {
  Dsa,
  DsaTopic,
};
