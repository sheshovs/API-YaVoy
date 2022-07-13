const { connection } = require("../config/db");

const tableName = "PEDIDO";

const requests = {
	getAllOrders: async () => {
		try {
			let sql = `SELECT * FROM ${tableName};`;
			return new Promise((resolve, reject) => {
				connection.query(sql, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(JSON.parse(JSON.stringify(result)));
					}
				});
			});
		} catch (error) {
			return error.response;
		}
	},

	createOrder: async (newOrder) => {
		try {
			const {
				Estado,
				Fecha_p,
				Descripcion,
				Cliente_idCliente,
				idRepartidor,
				Metodo_Pago_idMetodo_Pago,
			} = newOrder;

			let sql = `INSERT INTO ${tableName} (Estado, Fecha_p, Descripcion, Repartidor_idRepartidor, Cliente_idCliente, Metodo_Pago_idMetodo_Pago)
			VALUES ("${Estado}","${Fecha_p}","${Descripcion}","${idRepartidor}","${Cliente_idCliente}","${Metodo_Pago_idMetodo_Pago}");`;
			return new Promise((resolve, reject) => {
				connection.query(sql, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(JSON.parse(JSON.stringify(result)));
					}
				});
			});
		} catch (error) {
			return error.response;
		}
	},

	getIdRepartidor: async () => {
		try {
			let sql = `SELECT idRepartidor FROM REPARTIDOR ORDER BY RAND() LIMIT 1;`;
			return new Promise((resolve, reject) => {
				connection.query(sql, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(JSON.parse(JSON.stringify(result)));
					}
				});
			});
		} catch (error) {
			return error.response;
		}
	},
};

module.exports = requests;
