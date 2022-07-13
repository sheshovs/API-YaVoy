//Import services
const Delivery = require("./routes/delivery-service");
const Client = require("./routes/client-service");
const Restaurant = require("./routes/restaurant-service");
const Product = require("./routes/product-service");
const Order = require("./routes/order-service");

module.exports = (app) => {
	app.use(Delivery);
	app.use(Client);
	app.use(Restaurant);
	app.use(Product);
	app.use(Order);
};
