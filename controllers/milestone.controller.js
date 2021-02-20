const MilestoneService = require("../services/milestone.service");

exports.getTaskMilestones = async (req, res, next) => {
    try {
        const payload = await MilestoneService.getTaskMilestones(req.params.taskId);
        return res.status(200).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error fetching task milestones!"});
    }
};

exports.createMilestone = async (req, res, next) => {
    try {
        const payload = await MilestoneService.createMilestone(req.body.taskId, req.body.description);
        return res.status(201).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error creating new milestone!"});
    }
};

exports.updateMilestone = async (req, res, next) => {
    try {
        const payload = await MilestoneService.updateMilestone(req.params.id, req.body);
        return res.status(200).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error updating milestone!"});
    }
};

exports.deleteMilestoneById = async (req, res, next) => {
    try {
        const payload = await MilestoneService.deleteMilestoneById(req.params.id);
        return res.status(200).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error deleting milestone by id!"});
    }
};
