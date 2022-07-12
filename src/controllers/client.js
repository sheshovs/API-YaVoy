const Client = require("../repository/client");

const controller = {
	Login: async (req, res) => {
		const { correo, password } = req.body;

		if (!correo) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}
		if (!password) {
			return res.status(400).send({ error: "Falta ingresar la contraseña" });
		}

		const infoClient = await Client.login(correo);

		if (infoClient.length === 0)
			return res.status(404).send({ error: "No existe el correo" });

		if (correo !== infoClient[0].Correo) {
			return res.status(400).send({ error: "Correo incorrecto" });
		}

		if (password !== infoClient[0].Contrasena) {
			return res.status(400).send({ error: "Contraseña incorrecta" });
		}

		return res.status(200).send({
			message: "Inicio de sesión exitoso",
			data: { Rut_cliente: infoClient[0].Rut_cliente },
		});
	},
};

module.exports = controller;
