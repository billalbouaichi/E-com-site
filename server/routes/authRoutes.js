const express = require("express");
const { registerValidator } = require("../utils/validators/authValidator");
const { register } = require("../services/authServices");

const router = express.Router();

router.route("/register").post(registerValidator, register);
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
