const express = require("express"); /*
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
} = require("../services/userServices");
const {
  createUserValidator,
  updateUserValidator,
  getUservalidator,
  deleteUservalidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

router.route("/").get(getUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(getUservalidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUservalidator, deleteUser);
router.put(
  "/changepassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

module.exports = router;
