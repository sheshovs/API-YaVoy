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

	GetAllClients: async (req, res) => {
		const allClients = await Client.getAllClients();

		if (allClients.length === 0)
			return res.status(404).send({ error: "No existen clientes" });

		allClients.map((client) => delete client.Contrasena);

		return res.status(200).send({
			message: "Clientes encontrados",
			allClients,
		});
	},

	GetClientById: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send({ error: "Falta enviar el id del cliente" });
		}

		const client = await Client.checkIfClientExistById(id);

		if (client.length === 0)
			return res.status(404).send({ error: "No existe el cliente" });

		return res.status(200).send({
			message: "Cliente encontrado",
			client,
		});
	},

	CreateClient: async (req, res) => {
		const { Contrasena, Telefono, Correo, Direccion, Rut_cliente } = req.body;

		if (!Contrasena) {
			return res.status(400).send({ error: "Falta ingresar la contraseña" });
		}
		if (!Telefono) {
			return res.status(400).send({ error: "Falta ingresar el teléfono" });
		}
		if (!Correo) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}
		if (!Direccion) {
			return res.status(400).send({ error: "Falta ingresar la dirección" });
		}
		if (!Rut_cliente) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el rut del cliente" });
		}

		const newClient = {
			Contrasena,
			Telefono,
			Correo,
			Direccion,
			Rut_cliente,
		};

		const client = await Client.createClient(newClient);

		if (client.affectedRows > 0) {
			delete newClient.Contrasena;
			return res.status(200).send({
				message: "Cliente creado correctamente",
				data: newClient,
			});
		}
		return res.status(400).send({ error: "Error al crear el cliente" });
	},

	DeleteClient: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send({ error: "Falta enviar el id del cliente" });
		}

		const checkIfClientExist = await Client.checkIfClientExistById(id);

		if (checkIfClientExist.length === 0) {
			return res.status(404).send({ error: "El cliente no existe" });
		}

		const deleteClient = await Client.deleteClient(id);

		if (deleteClient.affectedRows > 0) {
			return res.status(200).send({
				message: "Cliente eliminado correctamente",
			});
		}
		return res.status(400).send({ error: "Error al eliminar el cliente" });
	},
};

module.exports = controller;
