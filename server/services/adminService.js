const asyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");

exports.getBenefice = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find({ etat: "Valider" }).populate({
    path: "orderItems",
    populate: {
      path: "product",
      model: "product",
    },
  });

  let totalBenefice = 0;

  orders.forEach((order) => {
    order.orderItems.forEach((orderItem) => {
      const product = orderItem.product;
      const benefice = product.nouveauprix * 0.5 * orderItem.quantite;
      totalBenefice += benefice;
    });
  });

  res.status(200).json({
    success: true,
    data: {
      benefice: totalBenefice,
    },
  });
});
