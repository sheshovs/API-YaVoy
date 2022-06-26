const express = require("express");
const router = express.Router();
//Import methods from controllers.
const File = require("../controllers/files");

router.route("/file/images").post(File.UploadFile);

module.exports = router;
