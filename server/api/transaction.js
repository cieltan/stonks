const router = require("express").Router();
const { Transactions } = require("../db/models/");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allTransactions = await Transactions.findAll({ where: { id } });
    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
