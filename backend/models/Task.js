const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  priority: String,
  dueDate: String,
  status: String
});

module.exports = mongoose.model("Task", TaskSchema);
