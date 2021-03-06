// imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// crear el servidor
const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// habilitar cors
app.use(cors());

// habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

app.use(router);
require("./src/routes")(app);
app.get("/", function (req, res) {
	res.render("index");
});

// arrancar la app
app.listen(PORT, () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

module.exports = app;
