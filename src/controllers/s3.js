const { generateUploadURL } = require("./../repository/s3");

const controller = {
	GetUrl: async (req, res) => {
		const url = await generateUploadURL();

		return res.status(200).send({ message: "URL generada correctamente", url });
	},
};

module.exports = controller;
