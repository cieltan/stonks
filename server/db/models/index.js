const User = require("./user");
const Transaction = require("./transactions");
const Holding = require("./holdings");

Holding.belongsTo(User);
User.hasMany(Holding);

Transaction.belongsTo(User);
User.hasMany(Transaction);

module.exports = {
  User,
  Transaction,
  Holding
};
