const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommonSchema = new Schema({
  floor: {
    type: Number,
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
  units: {
    type: Number,
    required: true,
  },
});

const Common = mongoose.model("common", CommonSchema);
module.exports = Common;
