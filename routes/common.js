const express = require("express");
const Common = require("../models/Common");

const router = express.Router();

router.post("/add", async (req, res) => {
  let { month, year, floor, units, tenants } = req.query;
  if (!month || !year || !floor || !units || !tenants) {
    return res
      .status(200)
      .json({ Error: "Please fill out the required fields!" });
  }
  try {
    let common = await Common.findOne({ month, year, floor });
    if (!common) {
      let common = await Common.create({
        month: month,
        year: Number(year),
        floor: Number(floor),
        units: Number(floor),
      });
      console.log(common);
      return res.status(200).json({ Success: true });
    }
    return res.status(200).json({ Error: "Already Exists!" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get", async (req, res) => {
  let { month, year, room } = req.query;
  if (!month || !year || !room) {
    return res
      .status(200)
      .json({ Error: "Please fill out the required fields!" });
  }

  try {
    let floor = 2;
    if (Number(room) >= 8) {
      floor = 3;
    }
    let common = await Common.findOne({ month, year: Number(year), floor })
      .select("-_id")
      .select("-__v");
    if (!common) {
      return res.status(200).json({ Error: "Record not found!" });
    }
    return res.status(200).json(common);
    console.log(common);
  } catch (error) {
    console.log(error);
  }
});

router.get("/divide", async (req, res) => {
  let { month, year, room } = req.query;

  try {
    let floor = 2;
    if (Number(room) >= 8) {
      floor = 3;
    }
    let common = await Common.findOne({ month, year: Number(year), floor });
    if (!common) {
      return res.status(200).json({ Error: "Record not found!" });
    }
    let tenants = await Tenant.find();
    tenants.forEach((tenant) => {
      if (tenant.left === "true") {
      }
    });
    console.log(common);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
