const express = require("express");
const {
  createPannierValidator,
} = require("../utils/validators/pannierValidator");
const { createPannier } = require("../services/pannierService");

const verifyToken = require("../middlewares/verifieToken");

const router = express.Router();

router.route("/").post(createPannierValidator, createPannier);

module.exports = router;
