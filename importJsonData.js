const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Book = require("./models/bookModel");

const dbURL = process.env.DATABASE_URL;
async function main() {
  await mongoose.connect(dbURL);
  console.log("Database connected");
}
main().catch((err) => console.log(err.message));

const books = fs.readFileSync("./dev-data/books.json", "utf-8");

const importData = async () => {
  try {
    await Book.create(JSON.parse(books));
    console.log("Data created successfully");
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

console.log(process.argv);
if (process.argv[2] === "--import") {
  importData();
}
