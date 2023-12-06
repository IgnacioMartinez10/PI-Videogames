const { Router } = require("express");
const { getGenres } = require("../handlers/getGenres");

const genresRouter = Router();

genresRouter.get("/", getGenres);

module.exports = genresRouter;
