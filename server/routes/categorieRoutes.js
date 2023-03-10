const express = require("express");
const {
  getCategorieSpValidator,
  updateCategorieValidator,
  createCategorieValidator,
  deleteCategorieValidator,
} = require("../utils/validators/categorieValidator");

const {
  getCategories,
  createCategories,
  getCategorieSp,
  updateCategories,
  deleteCategories,
} = require("../services/categorieServices");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(createCategorieValidator, createCategories);
router
  .route("/:id")
  .get(getCategorieSpValidator, getCategorieSp)
  .put(updateCategorieValidator, updateCategories)
  .delete(deleteCategorieValidator, deleteCategories);
module.exports = router;
