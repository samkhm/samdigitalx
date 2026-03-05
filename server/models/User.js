const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name : {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type:String, default: "SamdigitalX"}
    email: {type: String, required: true, unique: true},
    phone: String,
    role: { type: String, enum: ["admin"], default: "admin"},
    password: {type: String, required: true}
});
module.exports = mongoose.model("User", userSchema);