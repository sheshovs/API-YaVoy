const Delivery = require("../repository/delivery");

const controller = {
	Login: async (req, res) => {
		const { correo, password } = req.body;

		if (!correo) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}
		if (!password) {
			return res.status(400).send({ error: "Falta ingresar la contraseña" });
		}

		const infoDelivery = await Delivery.login(correo);

		if (infoDelivery.length === 0)
			return res.status(404).send({ error: "No existe el correo" });

		if (correo !== infoDelivery[0].Correo) {
			return res.status(400).send({ error: "Correo incorrecto" });
		}

		if (password !== infoDelivery[0].Contraseña) {
			return res.status(400).send({ error: "Contraseña incorrecta" });
		}

		return res.status(200).send({
			message: "Inicio de sesión exitoso",
			data: { Rut_Rep: infoDelivery[0].Rut_Rep },
		});
	},

	GetDeliveries: async (req, res) => {
		const deliveries = await Delivery.getAllDeliveries();
		if (deliveries.length === 0)
			return res.status(404).send({ error: "No existen usuarios" });

		deliveries.map((delivery) => delete delivery.Contraseña);

		return res
			.status(200)
			.send({ message: "Usuarios encontrados", deliveries });
	},

	GetDeliveriesRut: async (req, res) => {
		const ruts = await Delivery.getAllDeliveriesRut();
		if (ruts.length === 0)
			return res.status(404).send({ error: "No existen usuarios" });

		return res.status(200).send({ message: "Ruts encontrados", ruts });
	},

	CreateDelivery: async (req, res) => {
		const {
			rut,
			p_nombre,
			s_nombre,
			p_apellido,
			s_apellido,
			nro_documento,
			nacionalidad,
			calificacion,
			genero,
			password,
			correo,
		} = req.body;

		if (!rut) {
			return res.status(400).send({ error: "Falta ingresar el rut" });
		}
		if (!p_nombre) {
			return res.status(400).send({ error: "Falta ingresar el nombre" });
		}
		if (!p_apellido) {
			return res.status(400).send({ error: "Faltan ingresar el apellido" });
		}
		if (!nacionalidad) {
			return res.status(400).send({ error: "Falta ingresar nacionalidad" });
		}

		const checkIfDeliveryExist = await Delivery.checkIfDeliveryExist(rut);

		if (checkIfDeliveryExist.length > 0) {
			return res
				.status(400)
				.send({ error: "El repartidor se encuentra registrado" });
		}

		const newDelivery = {
			rut,
			p_nombre,
			s_nombre: s_nombre || null,
			p_apellido,
			s_apellido: s_apellido || null,
			nro_documento: nro_documento || 0,
			nacionalidad,
			calificacion: calificacion || null,
			genero: genero || null,
			password: password || null,
			correo: correo || null,
		};

		const delivery = await Delivery.createDelivery(newDelivery);

		if (delivery.affectedRows > 0) {
			return res.status(200).send({
				message: "Repartidor creado correctamente",
				data: newDelivery,
			});
		}
	},

	UpdateDelivery: async (req, res) => {
		const {
			rut,
			p_nombre,
			s_nombre,
			p_apellido,
			s_apellido,
			nro_documento,
			nacionalidad,
			calificacion,
			genero,
			correo,
		} = req.body;

		if (!rut) {
			return res.status(400).send({ error: "Falta ingresar el rut" });
		}
		if (!p_nombre) {
			return res.status(400).send({ error: "Falta ingresar el nombre" });
		}
		if (!p_apellido) {
			return res.status(400).send({ error: "Faltan ingresar el apellido" });
		}
		if (!nacionalidad) {
			return res.status(400).send({ error: "Falta ingresar nacionalidad" });
		}

		const checkIfDeliveryExist = await Delivery.getDelivery(rut);

		if (checkIfDeliveryExist.length < 1) {
			return res
				.status(400)
				.send({ error: "El repartidor no se encuentra registrado" });
		}

		const updateDelivery = {
			rut: checkIfDeliveryExist[0].Rut_Rep,
			p_nombre: p_nombre || checkIfDeliveryExist[0].p_nombre,
			s_nombre: s_nombre || checkIfDeliveryExist[0].s_nombre,
			p_apellido: p_apellido || checkIfDeliveryExist[0].p_apellido,
			s_apellido: s_apellido || checkIfDeliveryExist[0].s_apellido,
			nro_documento:
				nro_documento || checkIfDeliveryExist[0].nro_documento || 0,
			nacionalidad: nacionalidad || checkIfDeliveryExist[0].Nacionalidad,
			calificacion: calificacion || checkIfDeliveryExist[0].Calificacion,
			genero: genero || checkIfDeliveryExist[0].Genero,
			correo: correo || checkIfDeliveryExist[0].Correo,
		};

		const delivery = await Delivery.updateDelivery(updateDelivery);

		if (delivery.affectedRows > 0) {
			return res.status(200).send({
				message: "Repartidor actualizado correctamente",
				data: updateDelivery,
			});
		}
	},

	GetDelivery: async (req, res) => {
		const { rut } = req.query;

		if (!rut) {
			return res.status(400).send({ error: "Falta ingresar el rut" });
		}

		const delivery = await Delivery.getDelivery(rut);
		if (delivery.length === 0) {
			return res.status(404).send({ error: "Repartidor no encontrado" });
		}

		delete delivery[0].Contraseña;

		return res
			.status(200)
			.send({ message: "Repartidor encontrado", data: delivery });
	},

	DeleteDelivery: async (req, res) => {
		const { rut } = req.query;

		if (!rut) {
			return res.status(400).send({ error: "Falta ingresar el rut" });
		}

		const checkIfDeliveryExist = await Delivery.getDelivery(rut);

		if (checkIfDeliveryExist.length < 1) {
			return res
				.status(400)
				.send({ error: "El repartidor no se encuentra registrado" });
		}

		await Delivery.deleteDelivery(rut);

		return res.status(200).send({ message: "Repartidor eliminado" });
	},
};

module.exports = controller;
