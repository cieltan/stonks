const router = require("express").Router();
const axios = require("axios");
const { Transaction, User, Holding } = require("../db/models/");

const secret = process.env.ALPHA_SECRET;
const baseURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE";

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allTransactions = await Transaction.findAll({ where: { id } });
    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    let { quant, symbol } = body;
    quant = Number(quant);
    symbol = symbol.toUpperCase();
    if (!Number.isNaN(Number(quant)) && Number.isInteger(Number(quant))) {
      const { data } = await axios.get(
        `${baseURL}&symbol=${symbol}&apikey=${secret}`
      );
      const cost = data["Global Quote"]["05. price"] * 100 * quant;
      const { id } = req.user.dataValues;
      const user = await User.findByPk(id);
      const { balance } = user;
      const difference = balance - cost;
      if (difference < 0) {
        res.status(401).send("Insufficient funds.");
      } else {
        await user.update({ balance: difference });
        const newTransaction = await Transaction.create({
          symbol,
          action: "BUY",
          price: cost,
          userId: id,
          quantity: quant
        });
        const [hold, created] = await Holding.findOrCreate({
          where: { symbol, userId: id },
          defaults: {
            quantity: quant
          }
        });
        if (!created) {
          hold.update({ quantity: hold.quantity + quant });
        }
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
