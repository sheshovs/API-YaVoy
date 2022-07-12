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
};

module.exports = requests;
