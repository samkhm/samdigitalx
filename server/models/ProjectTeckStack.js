const mongoose = require('mongoose');

const projectTechStackSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
    stach : String
});

module.exports = mongoose.model("Stack", projectTechStackSchema);