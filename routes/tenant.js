const express = require("express");
const Tenant = require("../models/Tenant");
const Rent = require("../models/Rent");
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");
const router = express.Router();

router.post("/createnant", fetchUser, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.joiningDate ||
    !req.body.mobileNo ||
    !req.body.roomNo
  ) {
    return res
      .status(400)
      .json({ Error: "Please provide all the required fields" });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ Error: "User not found" });
    }
    let ten = await Tenant.findOne({ name: req.body.name, user: req.user.id });
    if (ten) {
      return res
        .status(400)
        .json({ Error: "A tenant with that name already exists" });
    }

    ten = await Tenant.create({
      name: req.body.name,
      joiningDate: req.body.joiningDate,
      mobileNo: Number(req.body.mobileNo),
      roomNo: Number(req.body.roomNo),
      user: req.user.id,
    });

    await ten.save();
    res.status(200).json({ Success: true });
  } catch (err) {
    res.status(500).send({ Error: "Internal Server Error" });
  }
});

router.get("/getenant", fetchUser, async (req, res) => {
  if (!req.query.name) {
    return res
      .status(400)
      .json({ Error: "Please provide a valid tenant name" });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ Error: "User not found" });
    }
    let ten = await Tenant.findOne({ name: req.query.name, user: req.user.id })
      .select("-_id")
      .select("-__v")
      .select("-DateAdded");

    if (!ten) {
      return res
        .status(404)
        .json({ Error: "Tenant with that name not found!" });
    }

    return res.status(200).json(ten);
  } catch (err) {
    res.status(500).send({ Error: "Internal Server Error" });
  }
});

router.get("/getenants", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ Error: "User not found" });
    }
    let tens = await Tenant.find({ user: req.user.id })
      .select("-_id")
      .select("-__v")
      .select("-DateAdded");
    res.status(200).json(tens);
  } catch (err) {
    res.status(500).send({ Error: "Internal Server Error" });
  }
});

router.put("/updatenant", fetchUser, async (req, res) => {
  const { name, mobileNo, roomNo, left, joiningDate } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ Error: "Please provide a valid tenant name" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ Error: "User not found" });
    }
    let tenant = await Tenant.findOne({ name, user: req.user.id });
    let updatedTenant = {};

    if (mobileNo) {
      updatedTenant.mobileNo = mobileNo;
    }
    if (roomNo) {
      updatedTenant.roomNo = roomNo;
    }
    if (left) {
      updatedTenant.left = left;
    }
    if (joiningDate) {
      updatedTenant.joiningDate = joiningDate;
    }
    if (!tenant) {
      return res.status(404).json({ Error: "Not found" });
    }

    tenant = await Tenant.findByIdAndUpdate(
      tenant.id,
      { $set: updatedTenant },
      { new: false }
    );
    res.status(200).json({ Success: true });
  } catch (err) {
    res.status(500).send({ Error: "Internal Server Error" });
  }
});

router.delete("/deletenant", fetchUser, async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ Error: "User not found" });
    }
    let tenant = await Tenant.findOne({ name, user: req.user.id });

    if (!name) {
      return res.status(404).send({ Error: "Please provide a valid name" });
    }

    if (!tenant) {
      return res.status(404).send({ Error: "Not found" });
    }

    await Tenant.findByIdAndDelete(tenant.id);
    await Rent.deleteMany({ name: tenant.name, user: req.user.id });
    return res.json({ Success: "Tenant has been deleted" });
  } catch (err) {
    res.status(500).send({ Error: "Internal Server Error" });
  }
});

module.exports = router;
