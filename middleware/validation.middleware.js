const { body } = require("express-validator");

const addSchoolValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("latitude").isFloat().withMessage("Latitude must be float"),
  body("longitude").isFloat().withMessage("Longitude must be float"),
];

module.exports = {
  addSchoolValidation,
};