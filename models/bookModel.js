const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },
  country: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  language: {
    type: String,
  },
  link: {
    type: String,
  },
  pages: {
    type: Number,
    required: [true, "Pages is required"],
    min: [5, "Pages must be above 5"],
  },
  title: {
    type: String,
    required: [true, "Titile is required"],
  },
  year: {
    type: Number,
    required: [true, "Years is required"],
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
