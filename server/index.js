require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const auth = require("./auth");
const api = require("./api");

const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "This is not a good secret",
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/auth", auth);
  app.use("/api", api);

  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  app.use((error, req, res) => {
    console.error(error);
    console.error(error.stack);
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error.");
  });
};

const startListening = () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

const syncDb = () => db.sync();

async function startApp() {
  await createApp();
  await syncDb();
  await startListening();
}

startApp();

module.exports = app;
