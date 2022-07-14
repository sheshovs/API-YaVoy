const { connection } = require("../config/db");

const tableName = "CLIENTE";

const requests = {
	login: async (correo) => {
		try {
			let sql = `SELECT Rut_cliente, Correo, Contrasena FROM ${tableName} WHERE Correo = "${correo}";`;
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

	getAllClients: async () => {
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

	getClientByRut: async (Rut_cliente) => {
		try {
			let sql = `SELECT * FROM ${tableName} WHERE Rut_cliente = "${Rut_cliente}";`;
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

	checkIfClientExistById: async (id) => {
		try {
			let sql = `SELECT * FROM ${tableName} WHERE idCliente = "${id}";`;
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

	createClient: async (newClient) => {
		try {
			const { Contrasena, Telefono, Correo, Direccion, Rut_cliente } =
				newClient;

			let sql = `INSERT INTO ${tableName} (Contrasena, Telefono, Correo, Direccion, Rut_cliente) 
			VALUES ("${Contrasena}",${Telefono},"${Correo}","${Direccion}","${Rut_cliente}");`;
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

	deleteClient: async (Rut_cliente) => {
		try {
			let sql = `DELETE FROM ${tableName} WHERE Rut_cliente = "${Rut_cliente}";`;
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
