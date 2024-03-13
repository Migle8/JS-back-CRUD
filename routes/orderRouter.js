const express = require("express");
const orderController = require("../controllers/orderController");

const {
  getAllOrders, getOrderByID, postOrder, getDate, updateOrder, deleteOrder,
} = orderController;

const orderRouter = express.Router();

orderRouter.route("/").get(getAllOrders).post(getDate, postOrder);
orderRouter.route("/:id").get(getOrderByID).patch(updateOrder).delete(deleteOrder);

module.exports = orderRouter;
