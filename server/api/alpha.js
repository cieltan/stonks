const router = require("express").Router();
const axios = require("axios");

const secret = process.env.ALPHA_SECRET;
const baseURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE";

router.get("/prices/:symbol", async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const { data } = await axios.get(
      `${baseURL}&symbol=${symbol}&apikey=${secret}`
    );
    const open = data["Global Quote"]["02. open"];
    const price = data["Global Quote"]["05. price"];
    res.json({ open, price });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
