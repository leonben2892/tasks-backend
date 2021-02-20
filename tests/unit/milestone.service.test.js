const milestoneService = require("../../services/milestone.service");
const MilestoneModel = require("../../models/milestone.model");
const milestoneMockData = require("../mock-data/milestone.json");

jest.mock("../../models/milestone.model");

beforeEach(() => {
    jest.resetAllMocks();
  });

describe("milestoneService", () => {
    describe("getTaskMilestones", () => {
        it("should have a getTaskMilestones function", () => {
            expect(typeof milestoneService.getTaskMilestones).toBe("function");
        });
        it("should call MilestoneModel.find method with task id", async () => {
            await milestoneService.getTaskMilestones(milestoneMockData.taskId);
            expect(MilestoneModel.find).toBeCalledWith({taskId: milestoneMockData.taskId});
        });
        it("should return a a list of milestones", async () => {
            MilestoneModel.find.mockReturnValue([milestoneMockData]);
            await expect(milestoneService.getTaskMilestones()).resolves.toStrictEqual([milestoneMockData]);
        });
        it("should return null if task not found", async () => {
            MilestoneModel.find.mockReturnValue(null);
            await expect(milestoneService.getTaskMilestones()).resolves.toStrictEqual(null);
        });
        it("should handle errors", async () => {
            const rejectedPromies = Promise.reject();
            MilestoneModel.find.mockReturnValue(rejectedPromies);
            await expect(milestoneService.getTaskMilestones()).rejects.toThrow(new Error("Error fetching task milestones!"));
        })
    });
    
    describe("createMilestone", () => {
        it("should have createMilestone function", () => {
            expect(typeof milestoneService.createMilestone).toBe("function");
        });
        it("should call MilestoneModel.create with required vars", async () => {
            await milestoneService.createMilestone(milestoneMockData.taskId, milestoneMockData.description);
            expect(MilestoneModel.create).toBeCalledWith({ taskId: milestoneMockData.taskId, description: milestoneMockData.description });
        });
        it("should return the created milestone", async () => {
            MilestoneModel.create.mockReturnValue(milestoneMockData);
            await expect(milestoneService.createMilestone()).resolves.toStrictEqual(milestoneMockData);
        });
        it("should handle erros", async () => {
            const rejectedPromise = Promise.reject();
            MilestoneModel.create.mockReturnValue(rejectedPromise);
            await expect(milestoneService.createMilestone()).rejects.toThrow(new Error("Error creating new milestone!"));
        });
    });

    describe("updateMilestone", () => {
        it("should have updateMilestone function", () => {
            expect(typeof milestoneService.updateMilestone).toBe("function");
        });
        it("should call MilestoneModel.findByIdAndUpdate with received vars", async () => {
            const updatedProps = {description: milestoneMockData.description};
            await milestoneService.updateMilestone(milestoneMockData._id, updatedProps);
            expect(MilestoneModel.findByIdAndUpdate).toBeCalledWith(milestoneMockData._id, updatedProps, { new: true, useFindAndModify: false });
        });
        it("should return the updated milestone", async () => {
            MilestoneModel.findByIdAndUpdate.mockReturnValue(milestoneMockData);
            await expect(milestoneService.updateMilestone()).resolves.toStrictEqual(milestoneMockData);
        });
        it("should handle erros", async () => {
            const rejectedPromise = Promise.reject();
            MilestoneModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
            await expect(milestoneService.updateMilestone()).rejects.toThrow(new Error("Error updating milestone!"));
        });
    });

    describe("deleteMilestoneById", () => {  
        it("should have deleteMilestoneById function", () => {
            expect(typeof milestoneService.deleteMilestoneById).toBe("function");
        });
        it("should call MilestoneModel.findByIdAndDelete with milestone id", async () => {
            await milestoneService.deleteMilestoneById(milestoneMockData._id);
            expect(MilestoneModel.findByIdAndDelete).toBeCalledWith(milestoneMockData._id);
        });
        it("should delete a specific milestone", async () => {
            MilestoneModel.findByIdAndDelete.mockReturnValue(milestoneMockData);
            await expect(milestoneService.deleteMilestoneById()).resolves.toStrictEqual(milestoneMockData);
        });
        it("should return null if milestone not found", async () => {
            MilestoneModel.findByIdAndDelete.mockReturnValue(null);
            await expect(milestoneService.deleteMilestoneById()).resolves.toBe(null);
        });
        it("should handle errors", async () => {
            const rejectedPromise = Promise.reject();
            MilestoneModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
            await expect(milestoneService.deleteMilestoneById()).rejects.toThrow(new Error('Error deleting milestone by id!'));
        });
    });
});