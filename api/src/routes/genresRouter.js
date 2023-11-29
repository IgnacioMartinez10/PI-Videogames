const { Router } = require("express");
const genresRouter = Router();
const { getAllGenresHandler } = require ("../handlers/getAllGenresHandler") 

genresRouter.get("/", getAllGenresHandler);

module.exports = genresRouter;