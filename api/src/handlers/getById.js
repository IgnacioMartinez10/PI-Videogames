const { getByIdDB } = require("../controllers/gamesController");

const getById = async (req, res) => {
  //el req trae los params
  const { id } = req.params;
  console.log(id);
  const source = isNaN(id) ? "bdd" : "api"; //devuelve true o false dependiendo de si me mandan un numero
  try {
    const response = await getByIdDB(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getById,
};
