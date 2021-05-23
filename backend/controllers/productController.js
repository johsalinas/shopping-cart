import Products from "../models/productModel.js";

export const getAll = async (req, res, next) => {
  const products = await Products.find();
  if (!products) {
    console.log("Error al traer productos");
  }
  res.status(200).json(products);
};

export const getById = async (req, res, next) => {
  const product = await Products.findOne({ id: req.params.id });
  if (!product) {
    console.log("Error al traer producto por id");
  }
  res.status(200).json(product);
};
