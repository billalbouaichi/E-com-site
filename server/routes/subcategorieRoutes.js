const express = require("express");

const {
  createSubCategories,
  deleteSubcategorie,
  updateSubcategorie,
  getSubCategories,
  getSubCategorieSp,
  setCategorieIdToBody,
  funcfilterObjects,
} = require("../services/subcategorieServices");
const {
  createSubCategorieValidator,
  deleteSubCategorieValidator,
  updateSubCategorieValidator,
  getSubCategorieSpValidator,
} = require("../utils/validators/subcategorieValidator");
//merge params : nous donne l'access a les parametre de les autres routes
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategorieIdToBody, createSubCategorieValidator, createSubCategories)
  .get(funcfilterObjects, getSubCategories);

router
  .route("/:id")
  .delete(deleteSubCategorieValidator, deleteSubcategorie)
  .put(updateSubCategorieValidator, updateSubcategorie)
  .get(getSubCategorieSpValidator, getSubCategorieSp);

module.exports = router;
