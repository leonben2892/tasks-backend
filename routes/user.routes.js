const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");


router.get("/", UserController.getUserByEmail);

router.get("/:userId", UserController.getUserById);

router.post("/", UserController.createUser);

module.exports = router;