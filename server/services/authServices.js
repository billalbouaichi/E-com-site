const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const user = require("../models/userModel");
/*----------------------------------------
* @desc   register user
* @Route  POST /api/v1/auth/register
* @access PUBLIC
----------------------------------------*/

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
  console.log(user);
  res.status(200).json({ data: newUser, message: "please log in" });
});

/*----------------------------------------
* @desc   Login user
* @Route  POST /api/v1/auth/login
* @access PUBLIC
----------------------------------------*/

exports.login = asyncHandler(async (req, res, next) => {
  const User = await user.findOne({ email: req.body.email });
  if (!User) {
    throw new Error("user not found");
  }
  const iscorrect = await bcrypt.compare(req.body.password, User.password);
  if (!iscorrect) {
    throw new Error("Mot de passe incorrect");
  }
  const token = User.generateToken();
  res
    .status(200)
    .json({ id: User._id, type: User.type, email: User.email, token });
});
