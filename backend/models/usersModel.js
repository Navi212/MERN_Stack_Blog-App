// Model for all Users
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, select: false, trim: true },
    phone: { type: Number, unique: true, required: true, trim: true },
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
