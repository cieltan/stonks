const router = require("express").Router();
const User = require("../db/models/user");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      const verifyPass = await user.correctPassword(req.body.password);
      if (!verifyPass) {
        console.log("Incorrect password for user:", req.body.email);
        res.status(401).send("Wrong username and/or password");
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    const user = await User.create(data);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/login");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

module.exports = router;
