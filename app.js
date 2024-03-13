const express = require("express");
const fs = require("fs");
const bookRouter = require("./routes/bookRouter");
const orderRouter = require("./routes/orderRouter");

const app = express();

app.use(express.json());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/orders", orderRouter);

module.exports = app;
