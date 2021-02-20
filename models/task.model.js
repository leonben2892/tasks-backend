const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    startDate: {type: Date, required: true, default: Date.now},
    userId: {type: mongoose.ObjectId, required: true},
    subject: {type: String, required: true},
    description: {type: String, required: true},
    importance: {type: Number, required: true},
    image: {type: String, required: true},
    isCompleted: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model("Task", TaskSchema);