// Models for Web Technologies
const mongoose = require('mongoose');

// Web Technologies model
const webTechSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});
const webTech = mongoose.model('webTech', webTechSchema);

// Web Technologies Topics model
const webTechTopicsSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'webTechTopic' },
  webTechNameId: { type: mongoose.Schema.Types.ObjectId, ref: 'webTech' },
});

const webTechTopic = mongoose.model('webTechTopic', webTechTopicsSchema);

module.exports = {
  webTech,
  webTechTopic,
};
