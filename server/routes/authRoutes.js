const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
const { register, login } = require("../services/authServices");

const router = express.Router();

router.route("/register").post(registerValidator, register);
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
