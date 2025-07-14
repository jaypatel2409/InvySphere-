const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  image: { type: String },
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema); 