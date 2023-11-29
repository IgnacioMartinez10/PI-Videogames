const { Router } = require("express");
const videogamesRouter = Router();

const { getAllVideogamesHandler } = require("../handlers/getAllVideogamesHandler")
const { getVideogamesByIdHandler } = require("../handlers/getVideogameByIdHandler")
const { getVideogameByNameHandler } = require ("../handlers/getVideogameByNameHandler");
const { createVideogameHandler } = require("../handlers/createVideogameHandler")

videogamesRouter.get("/", (req, res) =>{
    const { name } = req.query;
    (name) ? getVideogameByNameHandler(req, res) : getAllVideogamesHandler(req, res);
} );
videogamesRouter.get("/:id", getVideogamesByIdHandler);
videogamesRouter.post("/", createVideogameHandler);

module.exports = videogamesRouter;