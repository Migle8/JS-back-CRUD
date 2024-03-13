const fs = require("fs");
const Order = require("../models/orderModel");
// const { match } = require("assert");

exports.getDate = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

exports.getAllOrders = async (req, res) => {
  try {
    // const orders = await Order.find({
    //   orderedDate: {
    //     $gte: req.query.date1,
    //     $lte: req.query.date2,
    //   },
    // }).populate("orderedBooks");

    const filter = { ...req.query };
    let queryStr = JSON.stringify(filter);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Order.find(JSON.parse(queryStr)).populate("orderedBooks");

    const orders = await query;

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: { orders },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOrderByID = async (req, res) => {
  try {
    const { id } = req.params;
    const findOrder = await Order.findById(id);

    res.status(200).json({
      status: "success",
      data: findOrder,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.postOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      orderedDate: req.requestTime,
    });

    res.status(201).json({
      status: "success",
      data: { order: newOrder },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const ufields = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, ufields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { order: updatedOrder },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOrder = await Order.findByIdAndDelete(id);

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
