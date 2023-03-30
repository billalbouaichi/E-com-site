const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const product = require("../../models/productModel");
const user = require("../../models/userModel");
const categorie = require("../../models/categorieModel");
exports.createProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("nom du produit doit etre rensigner")
    .isLength({ min: 4 })
    .withMessage("trop petit")
    .isLength({ max: 60 })
    .withMessage("trop grand"),
  check("description")
    .notEmpty()
    .withMessage("La description du produit doit être renseignée.")
    .isLength({ min: 10 })
    .withMessage(
      "La description du produit doit contenir au moins 10 caractères."
    )
    .isLength({ max: 500 })
    .withMessage(
      "La description du produit ne doit pas dépasser 500 caractères."
    ),
  check("categorie")
    .notEmpty()
    .withMessage("La catégorie du produit doit être renseignée.")
    .isMongoId()
    .withMessage(
      "La catégorie du produit doit être une référence MongoDB valide."
    )
    .custom((val) => {
      return categorie.findOne({ _id: val }, { _id: 1 }).then((categorie) => {
        if (!categorie) {
          return Promise.reject(new Error("cet categorie n'existe pas"));
        }
      });
    }),
  check("fournisseur")
    .notEmpty()
    .withMessage("Le fournisseur du produit doit être renseigné.")
    .isMongoId()
    .withMessage(
      "Le fournisseur du produit doit être une référence MongoDB valide."
    )
    .custom((val) => {
      return user.findOne({ _id: val }, { type: 1 }).then((user) => {
        if (!user) {
          return Promise.reject(new Error("User not found"));
        }
        if (
          !user.type.includes("Admin") &&
          !user.type.includes("Fournisseurs")
        ) {
          return Promise.reject(
            new Error(
              "Vous ne pouvez pas ajouter un produit pour un utilisateur qui n'est pas un admin ou un fournisseur"
            )
          );
        }
      });
    }),
  check("nouveauprix")
    .notEmpty()
    .withMessage("Le prix du produit doit être renseigné.")
    .isNumeric()
    .withMessage("Le prix du produit doit être un nombre."),
  check("quantite")
    .notEmpty()
    .withMessage("La quantité du produit doit être renseignée.")
    .isInt({ min: 0 })
    .withMessage("La quantité du produit doit être un entier positif."),
  check("image").optional({ nullable: true }),
  validatorMiddleware,
];

exports.getProductvalidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.getproductbycatValidator = [
  check("categories").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];
exports.getproductbyFournisseurValidator = [
  check("prop").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];
