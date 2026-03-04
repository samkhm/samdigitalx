const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    short: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: String,
    imagePublicId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);