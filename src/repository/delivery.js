const { connection } = require("../config/db");

const tableName = "REPARTIDOR";

const requests = {
	login: async (correo) => {
		try {
			let sql = `SELECT Rut_Rep, Correo, Contraseña FROM ${tableName} WHERE Correo = "${correo}";`;
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
	getAllDeliveries: async () => {
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
	getAllDeliveriesRut: async () => {
		try {
			let sql = `SELECT Rut_Rep FROM ${tableName};`;
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
	createDelivery: async (newDelivery) => {
		try {
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
			} = newDelivery;
			let sql = `INSERT INTO ${tableName} (Rut_Rep, p_nombre, s_nombre, p_apellido, s_apellido, nro_documento,Nacionalidad, Calificacion, Genero, Contraseña, Correo) 
			VALUES ("${rut}","${p_nombre}","${s_nombre}","${p_apellido}","${s_apellido}","${nro_documento}","${nacionalidad}","${calificacion}","${genero}","${password}","${correo}");`;
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

	updateDelivery: async (updateDelivery) => {
		try {
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
			} = updateDelivery;
			let sql = `UPDATE ${tableName} 
								SET 
									p_nombre = "${p_nombre}", 
									s_nombre = "${s_nombre}", 
									p_apellido = "${p_apellido}",
									s_apellido = "${s_apellido}",
									nro_documento = "${nro_documento}", 
									Nacionalidad = "${nacionalidad}", 
									Calificacion = "${calificacion}", 
									Genero = "${genero}",
									Correo = "${correo}"
								WHERE
									Rut_Rep = "${rut}";`;
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

	checkIfDeliveryExist: async (rut) => {
		try {
			let sql = `SELECT * FROM ${tableName} WHERE Rut_Rep = "${rut}";`;
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

	getDelivery: async (rut) => {
		try {
			let sql = `SELECT * FROM ${tableName} WHERE Rut_Rep = "${rut}";`;
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

	deleteDelivery: async (rut) => {
		try {
			let sql = `DELETE FROM ${tableName} WHERE Rut_Rep = "${rut}";`;
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
