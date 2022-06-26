const { connection } = require("../config/db");

const tableName = "REPARTIDOR";

const requests = {
	getAllUsers: async () => {
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
			return null;
		}
	},
};

module.exports = requests;
