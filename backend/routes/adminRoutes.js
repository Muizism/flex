const express = require("express");
const router = express.Router();
const { signup, signupAcademic} = require("../controllers/adminController");

router.post("/signup", signup);
router.post("/signup-academic", signupAcademic);

module.exports = router;
