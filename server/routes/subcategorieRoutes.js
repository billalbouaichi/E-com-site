const express = require("express");

const {
  createSubCategories,
  deleteSubcategorie,
  updateSubcategorie,
  getSubCategories,
  getSubCategorieSp
} = require("../services/subcategorieServices");
const {
  createSubCategorieValidator,
  deleteSubCategorieValidator,
  updateSubCategorieValidator,
  getSubCategorieSpValidator
} = require("../utils/validators/subcategorieValidator");

const router = express.Router();

router.route("/").post(createSubCategorieValidator, createSubCategories).get(getSubCategories);

router
  .route("/:id")
  .delete(deleteSubCategorieValidator, deleteSubcategorie)
  .put(updateSubCategorieValidator, updateSubcategorie)
  .get(getSubCategorieSpValidator,getSubCategorieSp);

module.exports = router;
