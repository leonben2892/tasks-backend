const TaskService = require("../services/task.service");

exports.getUserTasks = async (req, res, next) => {
    try {
        const payload = await TaskService.getUserTasks(req.query.userId);
        return res.status(200).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error fetching user tasks!"});
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const payload = await TaskService.getTaskById(req.params.id);
        return res.status(200).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error fetching task by id!"});
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const payload = await TaskService.createTask(req.body.userId, req.body.subject, req.body.description, req.body.importance, req.body.image);
        return res.status(201).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error creating new task!"});
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const payload = await TaskService.updateTask(req.params.id, req.body);
        return res.status(200).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error updating task!"});
    }
};

exports.deleteTaskById = async (req, res, next) => {
    try {
        const payload = await TaskService.deleteTaskById(req.params.id);
        return res.status(200).json({payload});
    } catch (e) {
        return res.status(500).json({message: "Error deleting task by id!"});
    }
};

