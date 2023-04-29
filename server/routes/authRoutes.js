const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
const {
  register,
  login,
  uploadUserImage,
  resizeImage,
} = require("../services/authServices");

const router = express.Router();

router
  .route("/register")
  .post(uploadUserImage, resizeImage, registerValidator, register);
router.route("/login").post(loginValidator, login);
/*router
  .route("/:id")
  .get(getUservalidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUservalidator, deleteUser);
router.put(
  "/changepassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);*/

module.exports = router;
