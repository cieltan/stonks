const router = require("express").Router();
const axios = require("axios");
const { Holdings } = require("../db/models");

const secret = process.env.ALPHA_SECRET;
const baseURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE";

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // const allHoldings = await Holdings.findAll({ where: { id } });
    const allHoldings = [
      { symbol: "AAPL", quantity: 1 },
      { symbol: "MSFT", quantity: 2 }
    ];
    const updatedPrice = allHoldings.map(async stock => {
      const { symbol } = stock;
      const { data } = await axios.get(
        `${baseURL}&symbol=${symbol}&apikey=${secret}`
      );
      let status = "same";
      const open = data["Global Quote"]["02. open"];
      const price = data["Global Quote"]["05. price"];
      if (open > price) {
        status = "bear";
      } else {
        status = "bull";
      }
      return { ...stock, price, status };
    });
    const result = await Promise.all(updatedPrice);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
