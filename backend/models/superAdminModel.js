// Model for all Users
const mongoose = require('mongoose');

const SuperAdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: Number, unique: true, required: true },
    role: 'SuperAdmin',
  },
  { timestamps: true }
);

const SuperAdmin = mongoose.model('SuperAdmin', SuperAdminSchema);

module.exports = SuperAdmin;
