const mongoose = require("mongoose");
const { Schema } = mongoose;

const TenantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: String,
    required: true,
  },
  left: {
    type: String,
    default: "false",
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  DateAdded: {
    type: String,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: true,
  },
});

const Tenant = mongoose.model("Tenants", TenantSchema);
module.exports = Tenant;
