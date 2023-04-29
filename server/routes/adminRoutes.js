const express = require("express");
const isAdmin = require("../middlewares/isAdmin");

const { getBenefice } = require("../services/adminService");

const router = express.Router();

router.route("/benefice").get(getBenefice);

module.exports = router;
