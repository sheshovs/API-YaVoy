const Users = require("../repository/user");

const controller = {
	GetUsers: async (req, res) => {
		const users = await Users.getAllUsers();
		if (users.length === 0)
			return res.status(404).send({ error: "No existen usuarios" });

		return res.status(200).send({ message: "Usuarios encontrados", users });
	},
};

module.exports = controller;
