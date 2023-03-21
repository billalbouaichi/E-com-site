const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const user = require("../models/userModel");
//@desc register user
//@Route POST /api/v1/auth/register
//@access PUBLIC
exports.register = asyncHandler(async (req, res, next) => {
  //create a new user
  // generate token
  const newUser = await user.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    numtel: req.body.numtel,
    email: req.body.email,
    password: req.body.password,
    numccp: req.body.numccp,
    numrc: req.body.numrc,
    numnif: req.body.numnif,
    relverib: req.body.relverib,
    type: req.body.type,
  });
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  console.log(user);
  res.status(200).json({ data: newUser, token });
});
