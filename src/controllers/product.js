const Product = require("./../repository/product");

const controller = {
	CreateProduct: async (req, res) => {
		const {
			Nom_prod,
			Precio,
			Stock,
			Imagen,
			Restaurante_idRestaurante,
			Categoria,
		} = req.body;

		if (!Nom_prod) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el nombre del producto" });
		}
		if (!Precio) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el precio del producto" });
		}
		if (!Stock) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el stock del producto" });
		}
		if (!Imagen) {
			return res.status(400).send({ error: "Falta ingresar la imagen" });
		}
		if (!Restaurante_idRestaurante) {
			return res
				.status(400)
				.send({ error: "Falta ingresar el id del restaurante" });
		}
		if (!Categoria) {
			return res.status(400).send({ error: "Falta ingresar la categoria" });
		}

		const newProduct = {
			Nom_prod,
			Precio,
			Stock,
			Imagen,
			Restaurante_idRestaurante,
			Categoria,
		};

		const product = await Product.createProduct(newProduct);

		if (product.affectedRows > 0) {
			return res.status(200).send({
				message: "Producto creado correctamente",
				data: newProduct,
			});
		}
		return res.status(400).send({ error: "Error al crear el producto" });
	},
	DeleteProduct: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send({ error: "Falta enviar el id del producto" });
		}

		const checkIfProductExist = await Product.checkIfProductExistById(id);

		if (checkIfProductExist.length === 0) {
			return res.status(404).send({ error: "El producto no existe" });
		}

		const deleteProduct = await Product.deleteProduct(id);

		if (deleteProduct.affectedRows > 0) {
			return res.status(200).send({
				message: "Producto eliminado correctamente",
			});
		}
		return res.status(400).send({ error: "Error al eliminar el producto" });
	},
	GetAllProducts: async (req, res) => {
		const allProducts = await Product.getAllProduct();

		if (allProducts.length === 0)
			return res.status(404).send({ error: "No existen productos" });

		return res.status(200).send({
			message: "Productos encontrados",
			allProducts,
		});
	},

	GetProductById: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send({ error: "Falta enviar el id del producto" });
		}

		const product = await Product.checkIfProductExistById(id);

		if (product.length === 0)
			return res.status(404).send({ error: "No existen el producto" });

		return res.status(200).send({
			message: "Producto encontrado",
			product,
		});
	},
};

module.exports = controller;
