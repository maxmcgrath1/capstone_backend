require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan")

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

const GameSchema = new mongoose.Schema({
        name: String,
        image: String,
        description: String,
});

const Game = mongoose.model("Game", GameSchema);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES //
app.get("/", (req, res) => {
    res.send("IT'S CAPSTONE TIME");
});

app.get("/games", async (req, res) => {
    try {
        res.json(await Game.find({}));
    } catch (error) {
        res.status(400).json(error)
    }
});

app.post("/games", async (req, res) => {
    try {
        res.json(await Game.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

app.put("/games/:id", async (req, res) => {
    try {
        res.json(
            await Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

app.delete("/games/:id", async (req, res) => {
    try {
        res.json(await Game.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});



app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));