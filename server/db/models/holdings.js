const Sequelize = require("sequelize");
const db = require("../db");

const Holding = db.define("holdings", {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
});

module.exports = Holding;
