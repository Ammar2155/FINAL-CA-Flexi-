const express = require("express")
const auth = require("../middleware/auth")
const Task = require("../models/Task")
const router = express.Router()

// Get all tasks for a user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// Create a task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required" })
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      userId: req.userId,
    })

    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// Update a task
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, status, dueDate, priority } = req.body

    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (title) task.title = title
    if (description) task.description = description
    if (status) task.status = status
    if (dueDate) task.dueDate = dueDate
    if (priority) task.priority = priority
    task.updatedAt = new Date()

    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

module.exports = router
