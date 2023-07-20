const mongoose = require('mongoose');

const ownerPasswordResetTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: String,
    required: true,
  },
});

ownerPasswordResetTokenSchema.methods.removeToken = function() {
  return this.remove();
};

module.exports = mongoose.model('OwnerPasswordResetToken', ownerPasswordResetTokenSchema);