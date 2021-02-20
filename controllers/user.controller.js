const UserService = require("../services/user.service");

exports.getUserByEmail = async (req, res, next) => {
    try {
        const user = await UserService.getUserByEmail(req.query.email);
        return res.status(200).json({user});
    } catch (e) {
        return res.status(500).json({message: "Error fetching user by email!"});
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.params.userId);
        return res.status(200).json({user});
    } catch (e) {
        return res.status(500).json({message: "Error fetching user by id!"});
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const user = await UserService.createUser(req.body.email, req.body.password);
        return res.status(201).json({user});
    } catch (e) {
        return res.status(500).json({message: "Error creating new user!"});
    }
};