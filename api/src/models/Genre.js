const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('genre', {
    id: {
      type: DataTypes.UUID, // Identificador unico universal.
      defaultValue: Sequelize.UUIDV4, //Genera un UUID ALEATORIO
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {timestamps: false});
};
