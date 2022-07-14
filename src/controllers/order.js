const Order = require("../repository/order");

const controller = {
	GetAllOrders: async (req, res) => {
		const allOrders = await Order.getAllOrders();

		if (allOrders.length === 0)
			return res.status(404).send({ error: "No existen pedidos" });

		return res.status(200).send({
			message: "Pedidos encontrados",
			allOrders,
		});
	},
	GetOrderById: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send({ error: "Falta enviar el id del cliente" });
		}

		const order = await Order.getOrderById(id);

		if (order.length === 0)
			return res.status(404).send({ error: "No existe el pedido" });

		return res.status(200).send({
			message: "Pedido encontrado",
			order,
		});
	},
	CreateOrder: async (req, res) => {
		const {
			Estado,
			Fecha_p,
			Descripcion,
			Cliente_idCliente,
			Metodo_Pago_idMetodo_Pago,
		} = req.body;

		if (!Estado) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}
		if (!Fecha_p) {
			return res.status(400).send({ error: "Falta ingresar la contraseña" });
		}
		if (!Descripcion) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}
		if (!Cliente_idCliente) {
			return res.status(400).send({ error: "Falta ingresar la contraseña" });
		}
		if (!Metodo_Pago_idMetodo_Pago) {
			return res.status(400).send({ error: "Falta ingresar el correo" });
		}

		const idRepartidor = await Order.getIdRepartidor();

		const newOrder = {
			Estado,
			Fecha_p,
			Descripcion,
			Cliente_idCliente,
			idRepartidor: idRepartidor[0].idRepartidor,
			Metodo_Pago_idMetodo_Pago,
		};

		const order = await Order.createOrder(newOrder);

		if (order.affectedRows > 0) {
			return res.status(200).send({
				message: "Pedido creado correctamente",
				newOrder,
			});
		}
		return res.status(400).send({ error: "Error al crear el pedido" });
	},
};

module.exports = controller;
