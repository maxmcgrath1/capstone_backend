const express = require('express');
const router = express.Router();
const { Game } = require('../models');

router.get("/", async (req, res) => {
    try {
        res.json(await Game.find({}));
    } catch (error) {
        res.status(400).json(error)
    }
});

router.post("/", async (req, res) => {
    try {
        res.json(await Game.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        res.json(
            await Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        res.json(await Game.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;