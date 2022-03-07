// DEPENDENCIES //
require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// SET APP //
const app = express();

// DB CONNECTION // 
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

// MIDDLEWARE //
app.use(cors());

// ROUTES //
app.get("/", (req, res) => {
    res.send("IT'S CAPSTONE TIME");
});

// LISTENER //
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));