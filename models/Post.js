const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String,   },
  // createdAt: { type: Date, default: Date.now }
},
{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);