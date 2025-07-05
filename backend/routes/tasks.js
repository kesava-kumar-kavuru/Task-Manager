const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create Task
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ message: "Task added", task });
  } catch (err) {
    res.status(500).json({ message: "Error saving task", error: err.message });
  }
});

// Get all tasks for a user by userId in query
router.get("/", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
});

// Delete task by ID
router.delete("/:taskId", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
});

module.exports = router;
