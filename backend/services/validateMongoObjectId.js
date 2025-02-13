// Validates mongo ObjectId before calling the DB
const mongoose = require('mongoose');

const isValidObjectId = (...ids) => {
  if (ids) {
    return ids.every((id) => mongoose.Types.ObjectId.isValid(id));
  }
  return false;
};

module.exports = { isValidObjectId };
