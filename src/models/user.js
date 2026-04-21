const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    emailOrPhone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
