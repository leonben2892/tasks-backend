const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true})
.then(() => {
    console.log("Connected to database!");
})
.catch((err) => {
    console.log("Failed to connect to the DB!", err);
});

app.get('/', (req, res) => {
	res.status(200).json({message: 'Hello World!'});
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/task", require("./routes/task.routes"));
app.use("/api/milestone", require("./routes/milestone.routes"));

module.exports = app;