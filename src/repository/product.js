const { connection } = require("../config/db");

const tableName = "PRODUCTO";

const requests = {
	getAllProduct: async (correo) => {
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

	checkIfProductExistById: async (id) => {
		try {
			let sql = `SELECT * FROM ${tableName} WHERE idProducto = "${id}";`;
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

	createProduct: async (newProduct) => {
		try {
			const {
				Nom_prod,
				Precio,
				Stock,
				Imagen,
				Restaurante_idRestaurante,
				Categoria,
			} = newProduct;

			let sql = `INSERT INTO ${tableName} (Nom_prod, Precio, Stock, Imagen, Restaurante_idRestaurante, Categoria) 
			VALUES ("${Nom_prod}","${Precio}","${Stock}","${Imagen}","${Restaurante_idRestaurante}","${Categoria}");`;
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

	deleteProduct: async (id) => {
		try {
			let sql = `DELETE FROM ${tableName} WHERE idProducto = "${id}";`;
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
