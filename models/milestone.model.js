const mongoose = require("mongoose");

const MilestoneSchema = mongoose.Schema({
    date: {type: Date, required: true, default: Date.now},
    taskId: {type: mongoose.Types.ObjectId, required: true, ref: 'Task'},
    description: {type: String, required: true}
});

module.exports = mongoose.model("Milestone", MilestoneSchema);