const { Router } = require("express");
const videogamesRouter = Router();

const { getAllVideogamesHandler } = require("../handlers/getAllVideogamesHandler")
const { getVideogamesByIdHandler } = require("../handlers/getVideogameByIdHandler")

videogamesRouter.get("/", getAllVideogamesHandler);
videogamesRouter.get("/:id", getVideogamesByIdHandler);

module.exports = videogamesRouter;