const express = require("express");
const router = express.Router();

const MilestoneController = require("../controllers/milestone.controller");

router.get("/:taskId", MilestoneController.getTaskMilestones);

router.post("/", MilestoneController.createMilestone);

router.put("/:id", MilestoneController.updateMilestone);

router.delete("/:id", MilestoneController.deleteMilestoneById);

module.exports = router;