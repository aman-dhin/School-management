const express = require("express");
const router = express.Router();

const {
  addSchool,
  listSchools,
} = require("../controllers/school.controller");

const {
  addSchoolValidation,
} = require("../middleware/validation.middleware");

router.post("/addSchool", addSchoolValidation, addSchool);

router.get("/listSchools", listSchools);

module.exports = router;    