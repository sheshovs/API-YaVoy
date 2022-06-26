const express = require("express");
const router = express.Router();
//Import methods from controllers.
const Users = require("../controllers/users");

router.route("/user").get(Users.GetUsers);

module.exports = router;
