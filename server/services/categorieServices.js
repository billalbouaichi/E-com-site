const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const CategorieModel = require("../models/categorieModel");
//@desc Get categories
//@route GET /api/v1/categories
//@access PUBLIC
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const categories = await CategorieModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});

//@desc Get specific by id categorie
//@route GET /api/v1/categories/:id
//@access PUBLIC
exports.getCategorieSp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const categories = await CategorieModel.findById(id);
  if (!categories) {
    // res.status(404).json({msg:`la categorie n'existe pas pour cette id ${id}`});
    return next(
      new ApiError(`la categorie n'existe pas pour cette id ${id}`, 404)
    );
  }
  res.status(200).json({ data: categories });
});

//@desc   create categorie
//@route  POST /api/v1/categories
//@access PRIVATE
exports.createCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const categorie = await CategorieModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: categorie });
});

//@desc Update categorie sp
//@route PUT /api/v1/categories/:id
//@access PRIVATE
exports.updateCategories = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const categories = await CategorieModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!categories) {
    return next(
      new ApiError(`la categorie n'existe pas pour cette id ${id}`, 404)
    );
  }
  res.status(200).json({ data: categories });
});

//@desc Delete specific categorie
//@route DELETE /api/v1/categories/:id
//@access PRIVATE
exports.deleteCategories = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const categories = await CategorieModel.findByIdAndDelete(id);
  if (!categories) {
    return next(
      new ApiError(`la categorie n'existe pas pour cette id ${id}`, 404)
    );
  }
  res.status(204).json({ data: "effectue avec succes" });
});
