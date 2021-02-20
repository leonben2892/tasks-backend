const MilestoneModel = require("../models/milestone.model");

const getTaskMilestones = async (taskId) => {
    try {
        const milestones = await MilestoneModel.find({taskId});
        return milestones;
    } catch (e) {
        throw new Error("Error fetching task milestones!");
    }
};

const createMilestone = async (taskId, description) => {
    try {
        const newMilestone = await MilestoneModel.create({taskId, description});
        return newMilestone;
    } catch (e) {
        throw new Error("Error creating new milestone!");
    }
};

const updateMilestone = async (id, updatedProps) => {
    try {
        const updatedMilestone = await MilestoneModel.findByIdAndUpdate(id, updatedProps, { new: true, useFindAndModify: false });
        return updatedMilestone;
    } catch (e) {
        throw new Error("Error updating milestone!");
    }
};

const deleteMilestoneById = async (id) => {
    try {
        const deletedMilestone = await MilestoneModel.findByIdAndDelete(id);
        return deletedMilestone;
    } catch (e) {
        throw new Error("Error deleting milestone by id!");
    }
};

module.exports = {
    getTaskMilestones,
    createMilestone,
    updateMilestone,
    deleteMilestoneById
}
