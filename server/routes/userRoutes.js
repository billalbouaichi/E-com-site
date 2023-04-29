const express = require("express");
const isAdmin = require("../middlewares/isAdmin");
/*
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');

const authService = require('../services/authService');
*/
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  ajouterAdresse,
} = require("../services/userServices");
const {
  createUserValidator,
  updateUserValidator,
  getUservalidator,
  deleteUservalidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");
const verifyToken = require("../middlewares/verifieToken");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, isAdmin, getUsers)
  .post(createUserValidator, createUser);
  
router
  .route("/:id")
  .get(verifyToken, isAdmin, getUservalidator, getUser)
  .put(verifyToken, isAdmin, updateUserValidator, updateUser)
  .delete(verifyToken, isAdmin, deleteUservalidator, deleteUser)
  .post(verifyToken,ajouterAdresse);
router.put(
  "/changepassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

module.exports = router;
