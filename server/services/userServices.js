const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");
const bcrypt = require("bcryptjs");
const user = require("../models/userModel");

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  PRIVATE
exports.getUsers = factory.getAll(user);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  PRIVATE
exports.getUser = factory.getOne(user);

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = factory.createOne(user);

// @desc    Update specific users
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await user.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom,
      prenom: req.body.prenom,
      type: req.body.type,
      adresse: req.body.adresse,
      numccp: req.body.numccp,
      numrc: req.body.numrc,
      numnif: req.body.numnif,
      relverib: req.body.relverib,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  // Trigger "save" event when update document
  document.save();
  res.status(200).json({ data: document });
});

// @desc    Delete specific users
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = factory.deleteOne(user);
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await user.findByIdAndUpdate(
    req.params.id,
    { password: await bcrypt.hash(req.body.password, 12) },
    { new: true }
  );
  if (!document) {
    return next(new ApiError(`No document for this ID ${req.params.id}`, 404));
  }
  document.save();
  res.status(200).json({ data: document });
});

exports.ajouterAdresse = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const adresse = req.body.adresse;

    // Trouver l'utilisateur par son ID
    const user = await User.findById(userId);

    // Ajouter l'adresse à la liste des adresses de l'utilisateur
    user.adresse.push(adresse);

    // Enregistrer les modifications de l'utilisateur
    await user.save();

    res.status(200).json({ message: "Adresse ajoutée avec succès" });
  } catch (error) {
    next(error);
  }
});
