const express = require("express");
const router = express.Router();
//Import methods from controllers.
const Delivery = require("../controllers/delivery");

router.route("/login").post(Delivery.Login);

router.route("/delivery").post(Delivery.CreateDelivery);
router.route("/delivery").patch(Delivery.UpdateDelivery);
router.route("/delivery").get(Delivery.GetDelivery);
router.route("/delivery").delete(Delivery.DeleteDelivery);

router.route("/allDelivery").get(Delivery.GetDeliveries);
router.route("/allDelivery/rut").get(Delivery.GetDeliveriesRut);

module.exports = router;
