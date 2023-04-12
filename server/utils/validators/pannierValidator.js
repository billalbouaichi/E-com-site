const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const product = require("../../models/productModel");

exports.createPannierValidator = [
  check("quantite")
    .notEmpty()
    .withMessage("la quantite dois etre rensigner ")
    .isInt({ min: 1 })
    .withMessage("la quantite doit être un nombre entier positif"),
  check("product")
    .notEmpty()
    .withMessage("le produit doit etre rensigner")
    .isMongoId()
    .withMessage("le produit dois faire reference a un id produit valide")
    .custom(async (value) => {
      try {
        const prod = await product.findOne({ _id: value });
        if (!prod) {
          return Promise.reject(new Error("ce produit n'existe pas"));
        }
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  validatorMiddleware,
];
