const UserService = require("../services/user.service");

exports.authenticateUser = async (req, res, next) => {
    try {
        const user = await UserService.authenticateUser(req.query.email, req.query.password);
        return res.status(200).json({user});
    } catch (e) {
        return res.status(500).json({message: "Error authenticating user!"});
    }
};
