const express = require("express");
const router = express.Router();
//Import methods from controllers.
const Client = require("../controllers/client");

router.route("/loginc").post(Client.Login);

module.exports = router;
