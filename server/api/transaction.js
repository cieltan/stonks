const router = require("express").Router();
const axios = require("axios");
const { Transactions, User, Holdings } = require("../db/models/");

const secret = process.env.ALPHA_SECRET;
const baseURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE";

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allTransactions = await Transactions.findAll({ where: { id } });
    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { symbol, quantity } = body;
    if (!Number.isNaN(Number(quantity)) && Number.isInteger(Number(quantity))) {
      const { data } = await axios.get(
        `${baseURL}&symbol=${symbol}&apikey=${secret}`
      );
      const cost = data["Global Quote"]["05. price"] * 100 * quantity;
      const { id } = req.user.dataValues;
      const user = await User.findByPk(id);
      const { balance } = user;
      const difference = balance - cost;
      if (difference < 0) {
        res.status(401).send("Insufficient funds.");
      } else {
        await user.update({ balance: difference });
        res.json(user);
      }
    } else {
      res.status(401).send("Invalid quantity. Please enter an integer.");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
