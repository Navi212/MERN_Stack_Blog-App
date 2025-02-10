// Model for all Users
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    phone: { type: Number, unique: true, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      default: 'User',
      enum: ['Admin', 'Moderator', 'SuperAdmin', 'User'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
