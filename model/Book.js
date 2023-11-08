const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },

  last_modified_date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Book = mongoose.model("books", BooksSchema);