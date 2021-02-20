const taskService = require("../../services/task.service");
const TaskModel = require("../../models/task.model");
const taskMockData = require("../mock-data/task.json");

jest.mock("../../models/task.model");

beforeEach(() => {
    jest.resetAllMocks();
  });

describe("taskService", () => {
    describe("getUserTasks", () => {
        it("should have a getUserTasks function", () => {
            expect(typeof taskService.getUserTasks).toBe("function");
        });
        it("should call TaskModel.find method with user id", async () => {
            await taskService.getUserTasks(taskMockData._id);
            expect(TaskModel.find).toBeCalledWith({userId: taskMockData._id});
        });
        it("should return a specific tasks", async () => {
            TaskModel.find.mockReturnValue([taskMockData]);
            await expect(taskService.getUserTasks()).resolves.toStrictEqual([taskMockData]);
        });
        it("should return null if user not found", async () => {
            TaskModel.find.mockReturnValue(null);
            await expect(taskService.getUserTasks()).resolves.toStrictEqual(null);
        });
        it("should handle errors", async () => {
            const rejectedPromies = Promise.reject();
            TaskModel.find.mockReturnValue(rejectedPromies);
            await expect(taskService.getUserTasks()).rejects.toThrow(new Error("Error fetching user tasks!"));
        })
    });

    describe("getTaskById", () => {
        it("should have a getTaskById function", () => {
            expect(typeof taskService.getTaskById).toBe("function");
        });
        it("should call TaskModel.findById method with task id", async () => {
            await taskService.getTaskById(taskMockData._id);
            expect(TaskModel.findById).toBeCalledWith(taskMockData._id);
        });
        it("should return a specific task", async () => {
            TaskModel.findById.mockReturnValue(taskMockData);
            await expect(taskService.getTaskById()).resolves.toStrictEqual(taskMockData);
        });
        it("should return null if task not found", async () => {
            TaskModel.findById.mockReturnValue(null);
            await expect(taskService.getTaskById()).resolves.toStrictEqual(null);
        });
        it("should handle errors", async () => {
            const rejectedPromies = Promise.reject();
            TaskModel.findById.mockReturnValue(rejectedPromies);
            await expect(taskService.getTaskById()).rejects.toThrow(new Error("Error fetching task by id!"));
        })
    });

    describe("createTask", () => {
        it("should have createTask function", () => {
            expect(typeof taskService.createTask).toBe("function");
        });
        it("should call TaskModel.create with required vars", async () => {
            await taskService.createTask(taskMockData._id, taskMockData.subject, taskMockData.description, taskMockData.importance, taskMockData.image);
            expect(TaskModel.create).toBeCalledWith({ userId: taskMockData._id, subject: taskMockData.subject, description: taskMockData.description, importance: taskMockData.importance, image: taskMockData.image});
        });
        it("should return the created task", async () => {
            TaskModel.create.mockReturnValue(taskMockData);
            await expect(taskService.createTask()).resolves.toStrictEqual(taskMockData);
        });
        it("should handle erros", async () => {
            const rejectedPromise = Promise.reject();
            TaskModel.create.mockReturnValue(rejectedPromise);
            await expect(taskService.createTask()).rejects.toThrow(new Error("Error creating new task!"));
        });
    });

    describe("updateTask", () => {
        it("should have updateTask function", () => {
            expect(typeof taskService.updateTask).toBe("function");
        });
        it("should call TaskModel.findByIdAndUpdate with received vars", async () => {
            const updatedProps = {subject: taskMockData.subject, description: taskMockData.description};
            await taskService.updateTask(taskMockData._id, updatedProps);
            expect(TaskModel.findByIdAndUpdate).toBeCalledWith(taskMockData._id, updatedProps, { new: true, useFindAndModify: false });
        });
        it("should return the updated task", async () => {
            TaskModel.findByIdAndUpdate.mockReturnValue(taskMockData);
            await expect(taskService.updateTask()).resolves.toStrictEqual(taskMockData);
        });
        it("should handle erros", async () => {
            const rejectedPromise = Promise.reject();
            TaskModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
            await expect(taskService.updateTask()).rejects.toThrow(new Error("Error updating task!"));
        });
    });
    
    describe("deleteTaskById", () => {  
        it("should have deleteTaskById function", () => {
            expect(typeof taskService.deleteTaskById).toBe("function");
        });
        it("should call TaskModel.findByIdAndDelete with task id", async () => {
            await taskService.deleteTaskById(taskMockData._id);
            expect(TaskModel.findByIdAndDelete).toBeCalledWith(taskMockData._id);
        });
        it("should delete a specific task", async () => {
            TaskModel.findByIdAndDelete.mockReturnValue(taskMockData);
            await expect(taskService.deleteTaskById()).resolves.toStrictEqual(taskMockData);
        });
        it("should return null if task not found", async () => {
            TaskModel.findByIdAndDelete.mockReturnValue(null);
            await expect(taskService.deleteTaskById()).resolves.toBe(null);
        });
        it("should handle errors", async () => {
            const rejectedPromise = Promise.reject();
            TaskModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
            await expect(taskService.deleteTaskById()).rejects.toThrow(new Error('Error deleting task by id!'));
        });
    });
});