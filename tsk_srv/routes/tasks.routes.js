const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");
const { authentication } = require("../middleware/authMiddleware");

// Middleware to verify JWT token and extract user ID
router.use(authentication);

// Create a new task for the authenticated user
router.post("/", async (req, res) => {
  try {
    const { title, description, priority, cardColor } = req.body;
    // console.log(req.body);
    if (!title || !priority || !cardColor) {
      return res
        .status(400)
        .json({ message: "Please provide title, priority, and cardColor" });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      cardColor,
      completed: false,
      user: req.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// Get all tasks of the authenticated user

router.get("/", async (req, res) => {
  try {
    let tasksQuery = { user: req.userId };

    // Search based on title if provided in query parameters
    if (req.query.title) {
      tasksQuery.title = { $regex: req.query.title, $options: "i" };
    }

    // Sort based on priority if provided in query parameters
    if (req.query.sortPriority) {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      tasksQuery = {
        ...tasksQuery,
        priority: { $in: Object.keys(priorityOrder) },
      };
      const sortByPriority = (a, b) =>
        priorityOrder[a.priority] - priorityOrder[b.priority];
      const tasks = await Task.find(tasksQuery);
      const sortedTasks = tasks.sort(sortByPriority);
      return res.status(200).json(sortedTasks);
    }

    // Sort based on completion status if provided in query parameters
    if (req.query.sortCompleted) {
      tasksQuery = {
        ...tasksQuery,
        completed: req.query.sortCompleted === "true",
      };
    }

    const tasks = await Task.find(tasksQuery);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// Get a single task of the authenticated user by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// Update a task of the authenticated user
router.put("/:id", async (req, res) => {
  try {
    const { title, description, priority, cardColor, completed } = req.body;
    const updatedFields = {
      title,
      description,
      priority,
      cardColor,
      completed,
    };

    // Ensure that at least one field is being updated
    if (!Object.values(updatedFields).some(Boolean)) {
      return res
        .status(400)
        .json({ message: "Please provide fields to update" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updatedFields,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// Delete a task of the authenticated user
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
