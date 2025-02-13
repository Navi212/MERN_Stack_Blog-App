// Models for Web Technologies
const mongoose = require('mongoose');

// Web Technologies model
const WebTechSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});
const WebTech = mongoose.model('WebTech', WebTechSchema);

// Web Technologies Topics model
const WebTechTopicsSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  webTechTopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'WebTechTopic' },
  webTechId: { type: mongoose.Schema.Types.ObjectId, ref: 'WebTech' },
});

const WebTechTopic = mongoose.model('WebTechTopic', WebTechTopicsSchema);

module.exports = {
  WebTech,
  WebTechTopic,
};
