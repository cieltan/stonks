const router = require("express").Router();
const portfolio = require("./portfolio");

router.use("/portfolio", portfolio);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
