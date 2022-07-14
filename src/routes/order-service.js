const express = require("express");
const router = express.Router();
//Import methods from controllers.
const Order = require("../controllers/order");

router.route("/order").get(Order.GetAllOrders);
router.route("/order/:id").get(Order.GetOrderById);
router.route("/order").post(Order.CreateOrder);

module.exports = router;
