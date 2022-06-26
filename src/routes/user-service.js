const express = require("express");
const router = express.Router();
//Import methods from controllers.
const Delivery = require("../controllers/delivery");

router.route("/delivery").post(Delivery.CreateDelivery);
router.route("/delivery").patch(Delivery.UpdateDelivery);
router.route("/delivery").get(Delivery.GetDelivery);
router.route("/allDelivery").get(Delivery.GetDeliveries);

module.exports = router;
