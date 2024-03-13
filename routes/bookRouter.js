const express = require("express");
const bookController = require("../controllers/bookController");

const {
  getAllBooks, getBookByID, postBook, updateBook, deleteBook,
} = bookController;

const bookRouter = express.Router();

bookRouter.route("/").get(getAllBooks).post(postBook);
bookRouter.route("/:id").get(getBookByID).patch(updateBook).delete(deleteBook);

module.exports = bookRouter;
