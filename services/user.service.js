const UserModel = require("../models/user.model");

const getUserByEmail = async(email) => {
    try {
        const user = await UserModel.findOne({email: email});
        return user;
    } catch (e) {
        throw new Error("Error fetching user by email!");
    }
};

const getUserById = async (id) => {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (e) {
        throw new Error("Error fetching user by id!")
    }
};

const createUser = async (email, password) => {
    try {
        const newUser = await UserModel.create({email, password});
        return newUser;
    } catch (e) {
        throw new Error("Error creating new user!");
    }
};

const deleteUserById = async (id) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return deletedUser;
    } catch (e) {
        throw new Error("Error deleting user by id!");
    }
};

const authenticateUser = async (email, password) => {
    try {
        const user = await UserModel.findOne({email, password}, {_id: 1, email: 1});
        return user;
    } catch (e) {
        throw new Error("Error authenticating user!");
    }
};


module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    deleteUserById,
    authenticateUser
  };
