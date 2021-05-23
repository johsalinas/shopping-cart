import Discount from "../models/discountModel.js";

export const getAll = async (req, res, next) => {
  const discounts = await Discount.find();
  if (!discounts) {
    console.log("Error al traer descuentos");
  }
  res.status(200).json(discounts);
};

export const getById = async (req, res, next) => {
  const discount = await Discount.findOne({
    brand: req.params.brand,
  });
  if (!discount) {
    console.log("Error al traer descuento por marca");
  }
  res.status(200).json(discount);
};
