const router = require("express").Router();
const portfolio = require("./portfolio");
const transaction = require("./transaction");
const alpha = require("./alpha");

router.use("/portfolio", portfolio);
router.use("/transaction", transaction);
router.use("/alpha", alpha);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
