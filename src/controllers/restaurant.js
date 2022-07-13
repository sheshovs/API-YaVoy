const Restaurant = require("../repository/restaurant");

const controller = {
	Login: async (req, res) => {
		const { Correo, Contrasena } = req.body;

		if (!Correo) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}
		if (!Contrasena) {
			return res.status(400).send({ error: "Falta ingresar la contraseña" });
		}

		const infoRestaurant = await Restaurant.login(Correo);

		if (infoRestaurant.length === 0)
			return res.status(404).send({ error: "No existe el correo" });

		if (Correo !== infoRestaurant[0].Correo) {
			return res.status(400).send({ error: "Correo incorrecto" });
		}

		if (Contrasena !== infoRestaurant[0].Contrasena) {
			return res.status(400).send({ error: "Contraseña incorrecta" });
		}

		return res.status(200).send({
			message: "Inicio de sesión exitoso",
		});
	},

	GetAllRestaurants: async (req, res) => {
		const allRestaurants = await Restaurant.checkIfRestaurantExist();

		if (allRestaurants.length === 0)
			return res.status(404).send({ error: "No existen restaurantes" });

		allRestaurants.map((restaurant) => delete restaurant.Contrasena);

		return res.status(200).send({
			message: "Restaurantes encontrados",
			allRestaurants,
		});
	},

	GetRestaurantById: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.send({ error: "Falta enviar el id del restaurant" });
		}

		const infoRestaurant = await Restaurant.checkIfRestaurantExistById(id);

		if (infoRestaurant.length === 0)
			return res.status(404).send({ error: "No existe el restaurante" });

		delete infoRestaurant[0].Contrasena;

		return res.status(200).send({
			message: "Restaurante encontrado",
			data: infoRestaurant[0],
		});
	},

	CreateRestaurant: async (req, res) => {
		const {
			Correo,
			Telefono,
			Direccion,
			Nombre_Negocio,
			Nombre_client,
			Apellido_client,
			Contrasena,
			Tipo_empresa,
		} = req.body;

		if (!Correo) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}
		if (!Contrasena) {
			return res.status(400).send({ error: "Falta ingresar la contraseña" });
		}
		if (!Telefono) {
			return res.status(400).send({ error: "Falta ingresar el teléfono" });
		}
		if (!Direccion) {
			return res.status(400).send({ error: "Falta ingresar la dirección" });
		}
		if (!Nombre_Negocio) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el nombre del negocio" });
		}
		if (!Nombre_client) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el nombre del cliente" });
		}
		if (!Apellido_client) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el apellido del cliente" });
		}
		if (!Tipo_empresa) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el tipo de empresa" });
		}

		const checkIfRestaurantExist = await Restaurant.checkIfRestaurantExist(
			Correo
		);

		if (checkIfRestaurantExist.length > 0) {
			return res
				.status(400)
				.send({ error: "El restaurante se encuentra registrado" });
		}

		const newRestaurant = {
			Correo,
			Telefono,
			Direccion,
			Nombre_Negocio,
			Nombre_client,
			Apellido_client,
			Contrasena,
			Tipo_empresa,
		};

		const restaurant = await Restaurant.createRestaurant(newRestaurant);

		if (restaurant.affectedRows > 0) {
			delete newRestaurant.password;
			return res.status(200).send({
				message: "Restaurante creado correctamente",
				data: newRestaurant,
			});
		}
		return res.status(400).send({ error: "Error al crear el restaurante" });
	},

	UpdateRestaurant: async (req, res) => {
		const { id } = req.params;
		const {
			Correo,
			Telefono,
			Direccion,
			Nombre_Negocio,
			Nombre_client,
			Apellido_client,
			Tipo_empresa,
		} = req.body;

		if (!id) {
			return res
				.status(400)
				.send({ error: "Falta enviar el id del restaurant" });
		}
		if (!Correo) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}
		if (!Telefono) {
			return res.status(400).send({ error: "Falta ingresar el teléfono" });
		}
		if (!Direccion) {
			return res.status(400).send({ error: "Falta ingresar la dirección" });
		}
		if (!Nombre_Negocio) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el nombre del negocio" });
		}
		if (!Nombre_client) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el nombre del cliente" });
		}
		if (!Apellido_client) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el apellido del cliente" });
		}
		if (!Tipo_empresa) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el tipo de empresa" });
		}

		const checkIfRestaurantExistById =
			await Restaurant.checkIfRestaurantExistById(id);

		if (checkIfRestaurantExistById.length === 0) {
			return res
				.status(400)
				.send({ error: "El restaurante no se encuentra registrado" });
		}

		const updateRestaurant = {
			Correo: Correo || checkIfRestaurantExistById[0].Correo,
			Telefono: Telefono || checkIfRestaurantExistById[0].Telefono,
			Direccion: Direccion || checkIfRestaurantExistById[0].Direccion,
			Nombre_Negocio:
				Nombre_Negocio || checkIfRestaurantExistById[0].Nombre_Negocio,
			Nombre_client:
				Nombre_client || checkIfRestaurantExistById[0].Nombre_client,
			Apellido_client:
				Apellido_client || checkIfRestaurantExistById[0].Apellido_client,
			Tipo_empresa: Tipo_empresa || checkIfRestaurantExistById[0].Tipo_empresa,
		};

		const restaurant = await Restaurant.updateRestaurant(id, updateRestaurant);

		if (restaurant.affectedRows > 0) {
			return res.status(200).send({
				message: "Restaurante actualizado correctamente",
				data: updateRestaurant,
			});
		}
		return res
			.status(400)
			.send({ error: "Error al actualizar el restaurante" });
	},
	DeleteRestaurant: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.send({ error: "Falta enviar el id del restaurante" });
		}

		const checkIfRestaurantExist = await Restaurant.checkIfRestaurantExistById(
			id
		);

		if (checkIfRestaurantExist.length === 0) {
			return res.status(404).send({ error: "El restaurante no existe" });
		}

		const deleteRestaurant = await Restaurant.deleteRestaurant(id);

		if (deleteRestaurant.affectedRows > 0) {
			return res.status(200).send({
				message: "Restaurante eliminado correctamente",
			});
		}
		return res.status(400).send({ error: "Error al eliminar el restaurante" });
	},
};

module.exports = controller;
