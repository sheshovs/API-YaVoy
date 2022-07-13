const express = require("express");
const router = express.Router();
//Import methods from controllers.
const Product = require("../controllers/product");

router.route("/product/:id").get(Product.GetProductById);
router.route("/product").get(Product.GetAllProducts);
router.route("/product").post(Product.CreateProduct);
router.route("/product/:id").delete(Product.DeleteProduct);

module.exports = router;
