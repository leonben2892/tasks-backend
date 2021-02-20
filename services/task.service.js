const TaskModel = require("../models/task.model");

const getUserTasks = async (userId) => {
    try {
        const tasks = await TaskModel.find({userId: userId});
        return tasks;
    } catch (e) {
        throw new Error("Error fetching user tasks!");
    }
};

const getTaskById = async (id) => {
    try {
        const task = await TaskModel.findById(id);
        return task;
    } catch (e) {
        throw new Error("Error fetching task by id!")
    }
};

const createTask = async (userId, subject, description, importance, image) => {
    try {
        const newTask = await TaskModel.create({userId, subject, description, importance, image});
        return newTask;
    } catch (e) {
        throw new Error("Error creating new task!");
    }
}

const updateTask = async (id, updatedProps) => {
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, updatedProps, { new: true, useFindAndModify: false });
        return updatedTask;
    } catch (e) {
        throw new Error("Error updating task!");
    }
}

const deleteTaskById = async (id) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        return deletedTask;
    } catch (e) {
        throw new Error("Error deleting task by id!");
    }
}

module.exports = {
    getUserTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTaskById
}