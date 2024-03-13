const fs = require("fs");
const mongoose = require("mongoose");
const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const excludedFields = ["page", "limit", "sort", "fields"];
    const filter = { ...req.query };
    excludedFields.forEach((key) => delete filter[key]);

    let queryString = JSON.stringify(filter);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    let query = Book.find(JSON.parse(queryString));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-author");
    }

    if (req.query.page) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skipValue = (page - 1) * limit;

      query = query.skip(skipValue).limit(limit);

      const booksCount = await Book.countDocuments();
      if (skipValue >= booksCount) throw new Error("This page doesn't exist");
    }

    const books = await query;

    res.status(200).json({
      status: "success",
      results: books.length,
      data: { books },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const findBook = await Book.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        book: findBook,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.postBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: "success",
      data: { book: newBook },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { book: updatedBook },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const dbook = await Book.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
