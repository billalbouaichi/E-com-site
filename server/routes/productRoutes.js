const express = require("express");
const isForA = require("../middlewares/isFournisseurOrAdmin");
const isAdmin = require("../middlewares/isAdmin");
const prop = require("../middlewares/propritaire");
const {
  createProduct,
  getProducts,
  getSpeProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByFournisseur,
  uploadProductImages,
  resizeProductImages,
} = require("../services/productService");
const {
  createProductValidator,
  getProductvalidator,
  updateProductValidator,
  deleteProductValidator,
  getproductbycatValidator,
  getproductbyFournisseurValidator,
} = require("../utils/validators/productValidator");

const verifyToken = require("../middlewares/verifieToken");

const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    isForA,
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  )
  .get(getProducts);

router
  .route("/:id")
  .get(getProductvalidator, getSpeProduct)
  .put(
    verifyToken,
    isForA,
    prop,
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(verifyToken, isForA, prop, deleteProductValidator, deleteProduct);

/*-----------------------------
**@desc Get les produit dune categorie 
**@Route GET api/v1/products/categories/idcat
**@Acces PUBLIC 
-----------------------------*/
router
  .route("/categories/:categories")
  .get(getproductbycatValidator, getProductsByFournisseur);

/*-----------------------------
**@desc Get les produit dun fournisseur ou admin donne 
**@Route GET api/v1/products/
**@Acces Private
-----------------------------*/
router
  .route("/proprietaire/:prop")
  .get(
    verifyToken,
    isForA,
    getproductbyFournisseurValidator,
    getProductsByFournisseur
  );

module.exports = router;
