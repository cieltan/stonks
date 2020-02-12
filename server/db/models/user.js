const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("password");
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }
  }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = async function() {
  const salt = await bcrypt.genSalt();
  return salt;
};

User.encryptPassword = async function(plainText, salt) {
  console.log("plain", salt);
  const secured = await bcrypt.hash(plainText, salt);
  return secured;
};

/**
 * hooks
 */
const setSaltAndPassword = async user => {
  const newUser = user;
  if (newUser.changed("password")) {
    newUser.salt = await User.generateSalt();
    newUser.password = await User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});
