//Import services
const Delivery = require("./routes/delivery-service");
const S3 = require("./routes/s3-service");
const Files = require("./routes/files-service");

module.exports = (app) => {
	app.use(Delivery);
	app.use(S3);
	app.use(Files);
};
