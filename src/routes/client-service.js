const express = require("express");
const router = express.Router();
//Import methods from controllers.
const Client = require("../controllers/client");

router.route("/client/login").post(Client.Login);
router.route("/clients").get(Client.GetAllClients);
router.route("/client").get(Client.GetClientByRut);
router.route("/client").post(Client.CreateClient);
router.route("/client/:id").get(Client.GetClientById);
router.route("/client/:id").delete(Client.DeleteClient);

module.exports = router;
