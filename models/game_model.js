const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;