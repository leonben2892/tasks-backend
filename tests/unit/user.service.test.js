const userService = require("../../services/user.service");
const UserModel = require("../../models/user.model");
const userMockData = require("../mock-data/user.json");

jest.mock("../../models/user.model");

beforeEach(() => {
    jest.resetAllMocks();
  });

describe("userService", () => {
    describe("getUserByEmail", () => {
        it("should have a getUserByEmail function", () => {
            expect(typeof userService.getUserByEmail).toBe("function");
        });
        it("should call UserModel.findOne mehod with user email", async () => {
            await userService.getUserByEmail(userMockData.email);
            expect(UserModel.findOne).toBeCalledWith({email: userMockData.email});
        });
        it("should return a specific user", async () => {
            UserModel.findOne.mockReturnValue(userMockData);
            await expect(userService.getUserByEmail()).resolves.toStrictEqual(userMockData);
        });
        it("should return null if user not found", async () => {
            UserModel.findOne.mockReturnValue(null);
            await expect(userService.getUserByEmail()).resolves.toStrictEqual(null);
        });
        it("should handle errors", async () => {
            const rejectedPromies = Promise.reject();
            UserModel.findOne.mockReturnValue(rejectedPromies);
            await expect(userService.getUserByEmail()).rejects.toThrow(new Error("Error fetching user by email!"));
        })
    });
    describe("getUserById", () => {
        it("should have a getUserById function", () => {
            expect(typeof userService.getUserById).toBe("function");
        });
        it("should call UserModel.findById mehod with user id", async () => {
            await userService.getUserById(userMockData._id);
            expect(UserModel.findById).toBeCalledWith(userMockData._id);
        });
        it("should return a specific user", async () => {
            UserModel.findById.mockReturnValue(userMockData);
            await expect(userService.getUserById()).resolves.toStrictEqual(userMockData);
        });
        it("should return null if user not found", async () => {
            UserModel.findById.mockReturnValue(null);
            await expect(userService.getUserById()).resolves.toStrictEqual(null);
        });
        it("should handle errors", async () => {
            const rejectedPromies = Promise.reject();
            UserModel.findById.mockReturnValue(rejectedPromies);
            await expect(userService.getUserById()).rejects.toThrow(new Error("Error fetching user by id!"));
        })
    });
    describe("createUser", () => {
        it("should have createUser function", () => {
            expect(typeof userService.createUser).toBe("function");
        });
        it("should call UserModel.create with required vars", async () => {
            await userService.createUser(userMockData.email, userMockData.password);
            expect(UserModel.create).toBeCalledWith({ email: userMockData.email, password: userMockData.password });
        });
        it("should return the created user", async () => {
            UserModel.create.mockReturnValue(userMockData);
            await expect(userService.createUser()).resolves.toStrictEqual(userMockData);
        });
        it("should handle erros", async () => {
            const rejectedPromise = Promise.reject();
            UserModel.create.mockReturnValue(rejectedPromise);
            await expect(userService.createUser()).rejects.toThrow(new Error("Error creating new user!"));
        });
    });
    describe("deleteUserById", () => {  
        it("should have deleteUserById function", () => {
            expect(typeof userService.deleteUserById).toBe("function");
        });
        it("should call UserModel.findByIdAndDelete with user id", async () => {
            await userService.deleteUserById(userMockData._id);
            expect(UserModel.findByIdAndDelete).toBeCalledWith(userMockData._id);
        });
        it("should delete a specific user", async () => {
            UserModel.findByIdAndDelete.mockReturnValue(userMockData);
            await expect(userService.deleteUserById()).resolves.toStrictEqual(userMockData);
        });
        it("should return null if user not found", async () => {
            UserModel.findByIdAndDelete.mockReturnValue(null);
            await expect(userService.deleteUserById()).resolves.toBe(null);
        });
        it("should handle errors", async () => {
            const rejectedPromise = Promise.reject();
            UserModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
            await expect(userService.deleteUserById()).rejects.toThrow(new Error("Error deleting user by id!"));
        });
    });
    describe("validateUser", () => {
        it("should have a authenticateUser function", () => {
            expect(typeof(userService.authenticateUser)).toBe("function");
        });
        it("should call UserModel.findOne with user email and password", async () => {
            await userService.authenticateUser(userMockData.email, userMockData.password);
            expect(UserModel.findOne).toBeCalledWith({email: userMockData.email, password: userMockData.password}, {_id: 1, email: 1});
        });
        it("should return a user on correct credentials", async () => {
            UserModel.findOne.mockReturnValue(userMockData);
            await expect(userService.authenticateUser()).resolves.toStrictEqual(userMockData);
        });
        it("should return null on incorrect credentials", async () => {
            UserModel.findOne.mockReturnValue(null);
            await expect(userService.authenticateUser()).resolves.toBeNull();
        });
        it("should handle errors", async () => {
            const rejectedPromise = Promise.reject();
            UserModel.findOne.mockReturnValue(rejectedPromise);
            await expect(userService.authenticateUser()).rejects.toThrow(new Error("Error authenticating user!"));
        });
    });
});