const express = require("express");
const router = express.Router();
//Import methods from controllers.
const S3 = require("../controllers/s3");

router.route("/s3url").get(S3.GetUrl);

module.exports = router;
