const Files = require("./../repository/files");

const controller = {
	UploadFile: async (req, res) => {
		const { name, url } = req.body;
		const resp = await Files.uploadFile(name, url);
		if (resp.affectedRows > 0) {
			return res
				.status(200)
				.send({ message: "Link guardado correctamente", data: { name, url } });
		}
		return res.status(402).send({ message: "Error al guardar link" });
	},
};

module.exports = controller;
