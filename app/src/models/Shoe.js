const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    size: {
      type: Number,
      required: true,
      min: 1
    },
    status: {
      type: String,
      enum: ['available', 'out of stock'],
      default: 'available'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Shoe', shoeSchema);