const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");
const orderItem = require("../models/pannierModel");
/************************************
 * @desc    Creates Pannier
 * @route   api/v1/pannier
 * @access  Private Users with token valid
 ************************************/
exports.createPannier = asyncHandler(async (req, res) => {
  const { quantite, product } = req.body;
  const pannier = await pannier.create({ quantite, product });
  res.status(201).json({ data: pannier });
});
/************************************
 * @desc    Modifie Pannier
 * @route   PUT api/v1/pannier
 * @access  Private Users with token valid
 ************************************/
exports.updatePannier = asyncHandler(async (req, res, next) => {
  const { quantite, product } = req.body;
  const { id } = req.params;
  const pannier = await pannier.findByIdAndUpdate(
    { _id: id },
    { quantite: quantite, product: product },
    { new: true }
  );
  if (!pannier) {
    return next(
      new ApiError(`le pannier n'existe pas pour cette id ${id}`, 404)
    );
  }
  res.status(200).json({ data: pannier });
});
