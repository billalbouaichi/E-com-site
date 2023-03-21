const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategorieModel = require("../models/subCategorieModel");
const ApiError = require("../utils/apiError");
const subCategorieModel = require("../models/subCategorieModel");

exports.getSubCategorieSp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategories = await subCategorieModel
    .findById(id)
    .populate({ path: "categorie", select: "name _id" });
  if (!subcategories) {
    // res.status(404).json({msg:`la categorie n'existe pas pour cette id ${id}`});
    return next(
      new ApiError(`la categorie n'existe pas pour cette id ${id}`, 404)
    );
  }
  res.status(200).json({ data: subcategories });
});

exports.funcfilterObjects = (req, res, next) => {
  let filterObject = {};
  if (req.params.categorieId)
    filterObject = { categorie: req.params.categorieId };
  req.filterObject = filterObject;
  next();
};

exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const subcategories = await subCategorieModel
    .find(req.filterObject)
    .skip(skip)
    .limit(limit)
    .populate("categorie", "name -_id");
  res
    .status(200)
    .json({ result: subcategories.length, page, data: subcategories });
});

exports.setCategorieIdToBody = (req, res, next) => {
  if (!req.body.categorie) req.body.categorie = req.params.categorieId;
  next();
};
//@desc   create subCategorie
//@route  POST /api/v1/subcategories
//@access PRIVATE
exports.createSubCategories = asyncHandler(async (req, res) => {
  const { name, categorie } = req.body;
  const subcategorie = await SubCategorieModel.create({
    name,
    slug: slugify(name),
    categorie,
  });
  res.status(201).json({ data: subcategorie });
});

exports.deleteSubcategorie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategorie = await subCategorieModel.findByIdAndDelete(id);
  if (!subcategorie) {
    return next(
      new ApiError(`SubCategorie n'existe pas pour cette ID : ${id}`, 404)
    );
  }
  res.status(201).json({ data: "effectue avec successful" });
});

exports.updateSubcategorie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const subcategories = await subCategorieModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!subcategories) {
    return next(
      new ApiError(`la categorie n'existe pas pour cette id ${id}`, 404)
    );
  }
  res.status(200).json({ data: subcategories });
});
