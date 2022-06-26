const { connection } = require("../config/db");

const tableName = "ARCHIVOS";

const requests = {
	uploadFile: async (name, url) => {
		try {
			let sql = `INSERT INTO ${tableName} (name, url) VALUES ("${name}","${url}");`;
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
