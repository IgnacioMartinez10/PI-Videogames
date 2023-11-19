const { Router } = require("express");
const videogamesRouter = Router();

const { getAllVideogamesHandler } = require("../handlers/getAllVideogamesHandler")

videogamesRouter.get("/", getAllVideogamesHandler)

module.exports = videogamesRouter;