const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/task.controller");

router.get("/", TaskController.getUserTasks);

router.get("/:id", TaskController.getTaskById);

router.post("/", TaskController.createTask);

router.put("/:id", TaskController.updateTask);

router.delete("/:id", TaskController.deleteTaskById);


module.exports = router;