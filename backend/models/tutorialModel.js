// Models for Tutorials
const mongoose = require('mongoose');

// Tutorial language model
const TutorialSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
  },
  { timestamps: true }
);
const Tutorial = mongoose.model('Tutorial', TutorialSchema);

// Tutorial language Topics model
const TutorialTopicSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    tutorialTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TutorialTopic' || null,
    },
    tutorialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial' },
  },
  { timestamps: true }
);

const TutorialTopic = mongoose.model('TutorialTopic', TutorialTopicSchema);

module.exports = {
  Tutorial,
  TutorialTopic,
};
