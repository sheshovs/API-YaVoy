//Import services
const Delivery = require("./routes/delivery-service");
const Client = require("./routes/client-service");

module.exports = (app) => {
	app.use(Delivery);
	app.use(Client);
};
