const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const orderModel = require("../models/orderModel");
const orderItem = require("../models/pannierModel");
const productModel = require("../models/productModel");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderitem) => {
      const product = await productModel.findById(orderitem.product);
      if (!product) {
        throw new Error(
          "Le produit associé à l'item de commande n'a pas été trouvé."
        );
      }

      if (orderitem.quantite > product.quantite) {
        throw new Error(
          "La quantité demandée n'est pas disponible pour le produit : " +
            product.name
        );
      }
      let newOrderItem = new orderItem({
        quantite: orderitem.quantite,
        product: orderitem.product,
      });
      newOrderItem = await newOrderItem.save();

      product.quantite -= orderitem.quantite;
      await product.save();
      return newOrderItem._id;
    })
  );
  const orderItemsSolve = await orderItemsIds;
  const prixTotale = await Promise.all(
    orderItemsSolve.map(async (orderItemId) => {
      const orderIteme = await orderItem
        .findById(orderItemId)
        .populate("product", "nouveauprix");

      const total = orderIteme.product.nouveauprix * orderIteme.quantite;
      return total;
    })
  );
  const total = prixTotale.reduce((a, b) => a + b, 0);

  let order = new orderModel({
    orderItems: orderItemsSolve,
    user: req.user.id,
    adresse: req.body.adresse,
    telephone: req.body.telephone,
    prixTotal: total,
  });
  order = await order.save();

  res.status(200).json({ data: order });
});

exports.getOrders = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const orders = await orderModel
    .find({})
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: { path: "fournisseur", select: "-_id nom prenom" },
      },
    })
    .skip(skip)
    .limit(limit);
  res.status(200).json({ result: orders.length, page, data: orders });
});

exports.changeOrderStatus = asyncHandler(async (req, res, next) => {
  const { orderid } = req.params;
  const status = req.body.status;
  console.log(orderid);
  console.log(status);
  const order = await orderModel.findByIdAndUpdate(
    orderid,
    { etat: status },
    { new: true }
  );

  if (!order) {
    res.status(404).json({ data: "Commande Non Trouver" });
  }

  res.status(200).json({ data: order });
});

exports.getTotalPriceOrders = asyncHandler(async (req, res, next) => {
  const result = await orderModel.aggregate([
    {
      $match: { etat: "Valider" }, // Filtrer les commandes avec un état "Valider"
    },
    {
      $group: {
        _id: null, // Grouper par null pour obtenir le total global
        total: { $sum: "$prixTotal" }, // Utiliser $sum pour obtenir le total des prixTotal
      },
    },
  ]);
  const orders = await orderModel.find({ etat: "Valider" });
  if (result.length > 0) {
    res.status(200).json({ total: result[0].total, orders: orders }); // Renvoyer le total dans la réponse
  } else {
    res.status(404).json({ message: "Aucune commande active trouvée." });
  }
});

exports.getOrdersByUser = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user.id });
  if (!orders) {
    res.status(200).json({ message: "vous avez effectue aucune commande" });
  }
  res.status(200).json({ orders: orders });
});
