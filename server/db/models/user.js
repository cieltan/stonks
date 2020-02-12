const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../db");

const saltRounds = 10;

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  balance: {
    type: Sequelize.STRING,
    defaultValue: "500000"
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("password");
    }
  }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = async function(candidatePwd) {
  const match = await bcrypt.compare(candidatePwd, this.password());
  return match;
};

/**
 * classMethods
 */

User.encryptPassword = function(plainText, salt) {
  return bcrypt.hash(plainText, salt);
};

/**
 * hooks
 */
const setSaltAndPassword = async user => {
  const newUser = user;
  if (newUser.changed("password")) {
    newUser.password = await User.encryptPassword(user.password(), saltRounds);
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});
