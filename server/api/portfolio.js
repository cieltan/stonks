const router = require("express").Router();
const axios = require("axios");
const { Holding } = require("../db/models");

const iex = axios.create({
  baseURL: `https://api.iextrading.com/1.0/stock/`
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allHoldings = await Holding.findAll({ where: { userId: id } });
    const updatedPrice = allHoldings.map(async stock => {
      const { symbol, quantity } = stock;
      const { data } = await iex.get(`${symbol}/book`);
      let status = "same";
      const { open } = data.quote;
      const price = data.quote.latestPrice;
      if (open > price) {
        status = "bear";
      } else {
        status = "bull";
      }
      return { symbol, quantity, price, status };
    });
    const result = await Promise.all(updatedPrice);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
