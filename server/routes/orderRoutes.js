const {
  createOrderValidator,
  changeEtatOrderValidator,
} = require("../utils/validators/orderValidator");
const {
  createOrder,
  getOrders,
  changeOrderStatus,
  getTotalPriceOrders,
  getOrdersByUser,
} = require("../services/orderServices");
const express = require("express");
const verifyToken = require("../middlewares/verifieToken");
const router = express.Router();
router.route("/totalprice/").get(getTotalPriceOrders);
router.route("/orderbyusers/").get(verifyToken, getOrdersByUser);
router
  .route("/")
  .post(verifyToken, createOrderValidator, createOrder)
  .get(getOrders);
router.route("/:orderid").put(changeEtatOrderValidator, changeOrderStatus);
module.exports = router;
