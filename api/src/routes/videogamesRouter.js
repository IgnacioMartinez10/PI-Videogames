const { Router } = require("express");
const videogamesRouter = Router();

const { getAllVideogamesHandler } = require("../handlers/getAllVideogamesHandler")
const { getVideogamesByIdHandler } = require("../handlers/getVideogameByIdHandler")
const { getVideogameByNameHandler } = require ("../handlers/getVideogameByNameHandler")

videogamesRouter.get("/", getAllVideogamesHandler );
videogamesRouter.get("/:id", getVideogamesByIdHandler);
videogamesRouter.get("")

module.exports = videogamesRouter;