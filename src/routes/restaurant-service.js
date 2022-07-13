const express = require("express");
const router = express.Router();
//Import methods from controllers.
const Restaurant = require("../controllers/restaurant");

router.route("/restaurant/register").post(Restaurant.CreateRestaurant);
router.route("/restaurant/login").post(Restaurant.Login);
router.route("/restaurant/:id").patch(Restaurant.UpdateRestaurant);
router.route("/restaurant/:id").delete(Restaurant.DeleteRestaurant);
router.route("/restaurant/:id").get(Restaurant.GetRestaurantById);
router.route("/restaurant").get(Restaurant.GetAllRestaurants);

module.exports = router;
