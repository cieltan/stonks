const router = require("express").Router();
const Transactions = require("../db/models/transactions");

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const allTransactions = await Transactions.findAll({ where: { userId } });
    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
