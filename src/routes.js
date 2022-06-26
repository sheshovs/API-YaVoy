//Import services
const Users = require("./routes/user-service");
const S3 = require("./routes/s3-service");
const Files = require("./routes/files-service");

module.exports = (app) => {
	app.use(Users);
	app.use(S3);
	app.use(Files);
};
