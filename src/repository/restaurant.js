const { connection } = require("../config/db");

const tableName = "RESTAURANTE";

const requests = {
	login: async (correo) => {
		try {
			let sql = `SELECT Correo, Contrasena FROM ${tableName} WHERE Correo = "${correo}";`;
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
	checkIfRestaurantExist: async (correo) => {
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
	checkIfRestaurantExistById: async (id) => {
		try {
			let sql = `SELECT * FROM ${tableName} WHERE idRestaurante = "${id}";`;
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
	createRestaurant: async (newRestaurant) => {
		try {
			const {
				Correo,
				Telefono,
				Direccion,
				Nombre_Negocio,
				Nombre_client,
				Apellido_client,
				Contrasena,
				Tipo_empresa,
			} = newRestaurant;
			let sql = `INSERT INTO ${tableName} (Correo, Telefono, Direccion, Nombre_Negocio, Nombre_client, Apellido_client, Contrasena, Tipo_empresa) 
			VALUES ("${Correo}","${Telefono}","${Direccion}","${Nombre_Negocio}","${Nombre_client}","${Apellido_client}","${Contrasena}","${Tipo_empresa}");`;
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

	updateRestaurant: async (id, updateRestaurant) => {
		try {
			const {
				Correo,
				Telefono,
				Direccion,
				Nombre_Negocio,
				Nombre_client,
				Apellido_client,
				Tipo_empresa,
			} = updateRestaurant;

			let sql = ` UPDATE ${tableName} 
                  SET
                    Correo = "${Correo}",
                    Telefono = "${Telefono}",
                    Direccion = "${Direccion}",
                    Nombre_Negocio = "${Nombre_Negocio}",
                    Nombre_client = "${Nombre_client}",
                    Apellido_client = "${Apellido_client}",
                    Tipo_empresa = "${Tipo_empresa}"
			            WHERE
                    idRestaurante = "${id}";`;
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
	deleteRestaurant: async (id) => {
		try {
			let sql = `DELETE FROM ${tableName} WHERE idRestaurante = "${id}";`;
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
