const mongoose = require("mongoose");
const { Schema } = mongoose;

const RentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  currentReading: {
    type: Number,
    required: true,
  },
  lastReading: {
    type: Number,
    required: true,
  },
  netReading: {
    type: Number,
    required: true,
  },
  commonReading: {
    type: Number,
    required: true,
  },
  totalReading: {
    type: Number,
    required: true,
  },
  unitCharge: {
    type: Number,
    required: true,
  },
  electricBill: {
    type: Number,
    required: true,
  },
  paidOn: {
    type: String,
  },
  amount: {
    type: Number,
  },
  amountPaid: {
    type: Number,
  },
  pending: {
    type: Number,
    default: 0,
  },
  remark: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: true,
  },
});

const Rent = mongoose.model("Rent", RentSchema);
module.exports = Rent;
