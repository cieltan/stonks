const User = require("./user");
const Transactions = require("./transactions");
const Holdings = require("./holdings");

Holdings.belongsTo(User);
User.hasMany(Holdings);

Transactions.belongsTo(User);
User.hasMany(Transactions);

module.exports = {
  User,
  Transactions,
  Holdings
};
