// Model for all Users
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: {
      type: String,
      required: true,
      enum: ['SuperAdmin', 'Admin', 'Moderator', 'User'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
