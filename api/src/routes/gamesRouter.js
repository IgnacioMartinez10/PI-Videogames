const { Router } = require("express");
const { getGames } = require("../handlers/getGames");
const { getById } = require("../handlers/getById");
const { postGame } = require("../handlers/postGame");

const gamesRouter = Router();

gamesRouter.get("/", getGames);

gamesRouter.get("/:id", getById);

gamesRouter.post("/", postGame);

module.exports = gamesRouter;
