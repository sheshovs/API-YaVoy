// imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// crear el servidor
const app = express();
const router = express.Router();

// habilitar cors
app.use(cors());

// habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use(router);
require("./src/routes")(app);

// arrancar la app
app.listen(PORT, () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

module.exports = app;
