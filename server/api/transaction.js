const router = require("express").Router();
const axios = require("axios");
const { Transaction, User, Holding } = require("../db/models/");

const iex = axios.create({
  baseURL: `https://api.iextrading.com/1.0/stock/`
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allTransactions = await Transaction.findAll({
      where: { userId: id }
    });
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
    /* Integer and non-number validation */
    if (!Number.isNaN(Number(quant)) && Number.isInteger(Number(quant))) {
      const { data } = await iex.get(`${symbol}/book`);
      const cost = data.quote.latestPrice * 100 * quant;
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
          const updatedHold = await hold.update({
            quantity: hold.quantity + quant
          });
          res.json({ user, newTransaction, updatedHold });
        } else {
          res.json({ user, newTransaction, hold });
        }
      }
    } else {
      res.status(401).send("Invalid quantity. Please enter an integer.");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
