const mongoose = require("mongoose");

const testimonySchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    message: {type: String, required: true},
    approved: {type: Boolean, default: false},
    owner: {type: String, default: "User", required: true}
});
module.exports = mongoose.model("Testimony", testimonySchema);