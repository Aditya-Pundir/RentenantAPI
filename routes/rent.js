const express = require("express");
const Rent = require("../models/Rent");
const Tenant = require("../models/Tenant");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

const router = express.Router();

router.post("/newrent", fetchUser, async (req, res) => {
  if (
    req.body.name === undefined ||
    req.body.month === undefined ||
    req.body.year === undefined ||
    req.body.rent === undefined ||
    req.body.currentReading === undefined ||
    req.body.lastReading === undefined ||
    req.body.netReading === undefined ||
    req.body.commonReading === undefined ||
    req.body.totalReading === undefined ||
    req.body.unitCharge === undefined ||
    req.body.electricBill === undefined ||
    req.body.paidOn === undefined ||
    req.body.amount === undefined ||
    req.body.amountPaid === undefined ||
    req.body.pending === undefined ||
    req.body.remark === undefined
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
    const tenant = await Tenant.findOne({
      name: req.body.name,
      user: req.user.id,
    });
    if (!tenant) {
      return res.status(404).json({ Error: "Tenant not found" });
    }
    let rent = await Rent.find({ name: req.body.name, user: req.user.id });

    for (r in rent) {
      if (
        rent[r]["month"] === req.body.month &&
        rent[r]["year"] === Number(req.body.year)
      ) {
        return res
          .status(400)
          .json({ Error: "Rent has already been received for the month!" });
      }
    }

    rent = await Rent.create({
      name: req.body.name,
      month: req.body.month,
      year: Number(req.body.year),
      rent: Number(req.body.rent),
      currentReading: Number(req.body.currentReading),
      lastReading: Number(req.body.lastReading),
      netReading: Number(req.body.netReading),
      commonReading: Number(req.body.commonReading),
      totalReading: Number(req.body.totalReading),
      electricBill: Number(req.body.electricBill),
      paidOn: req.body.paidOn,
      unitCharge: Number(req.body.unitCharge),
      amount: Number(req.body.amount),
      amountPaid: Number(req.body.amountPaid),
      pending: Number(req.body.pending),
      remark: req.body.remark,
      user: req.user.id,
    });

    await rent.save();
    res.status(200).json({ Success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

router.get("/getrent", fetchUser, async (req, res) => {
  if (!req.body.name || !req.body.month || !req.body.year) {
    return res
      .status(400)
      .json({ Error: "Please provide all the required fields" });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ Error: "User not found" });
    }
    const tenant = await Tenant.findOne({
      name: req.body.name,
      user: req.user.id,
    });
    if (!tenant) {
      return res.status(404).json({ Error: "Tenant not found" });
    }
    let rent = await Rent.findOne({
      name: req.body.name,
      month: req.body.month,
      year: Number(req.body.year),
      user: req.user.id,
    })
      .select("-__v")
      .select("-DateAdded")
      .select("-_id");
    if (!rent) {
      return res.status(404).json({ Error: "Rent not found" });
    }

    res.status(200).json(rent);
  } catch (err) {
    res.status(500).send({ Error: "Internal Server Error" });
  }
});

router.get("/getallrent", fetchUser, async (req, res) => {
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
    let rent = await Rent.find({ name: req.query.name, user: req.user.id })
      .select("-__v")
      .select("-DateAdded")
      .select("-_id");
    if (!rent) {
      return res.status(404).json({ error: "No rent received yet!" });
    }

    res.status(200).json(rent);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updaterent", fetchUser, async (req, res) => {
  const {
    name,
    month,
    year,
    rentUpdated,
    currentReading,
    lastReading,
    netReading,
    commonReading,
    totalReading,
    electricBill,
    paidOn,
    unitCharge,
    amount,
    amountPaid,
    pending,
    remark,
  } = req.query;

  if (!name || !month || !year) {
    return res
      .status(400)
      .json({ Error: "Please provide all the required fields" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ Error: "User not found" });
    }
    let rent = await Rent.findOne({
      name,
      month,
      year,
      user: req.user.id,
    });
    let updatedRent = {};

    if (!rent) {
      return res
        .status(400)
        .json({ Error: "No rent was received for the month" });
    }

    if (rentUpdated) {
      updatedRent.rent = Number(rentUpdated);
    }
    if (currentReading) {
      updatedRent.currentReading = Number(currentReading);
    }
    if (lastReading) {
      updatedRent.lastReading = Number(lastReading);
    }
    if (netReading) {
      updatedRent.netReading = Number(netReading);
    }
    if (commonReading) {
      updatedRent.commonReading = Number(commonReading);
    }
    if (totalReading) {
      updatedRent.totalReading = Number(totalReading);
    }
    if (electricBill) {
      updatedRent.electricBill = Number(electricBill);
    }
    if (paidOn) {
      updatedRent.paidOn = paidOn;
    }
    if (unitCharge) {
      updatedRent.unitCharge = unitCharge;
    }
    if (amount) {
      updatedRent.amount = Number(amount);
    }
    if (amountPaid) {
      updatedRent.amountPaid = Number(amountPaid);
    }
    if (pending) {
      updatedRent.pending = Number(pending);
    }
    if (remark) {
      updatedRent.remark = remark;
    }

    rent = await Rent.findByIdAndUpdate(
      rent.id,
      { $set: updatedRent },
      { new: false }
    );

    await rent.save();
    res.status(200).json({ Success: true });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
