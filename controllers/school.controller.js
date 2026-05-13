const db = require("../config/db");
const { validationResult } = require("express-validator");
const calculateDistance = require("../utils/distance");

const addSchool = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { name, address, latitude, longitude } = req.body;

  const sql =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [name, address, latitude, longitude],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err,
        });
      }

      res.status(201).json({
        message: "School added successfully",
      });
    }
  );
};

const listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (!userLat || !userLon) {
    return res.status(400).json({
      message: "Latitude and longitude required",
    });
  }

  db.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    const sortedSchools = results
      .map((school) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: distance.toFixed(2),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  });
};

module.exports = {
  addSchool,
  listSchools,
};