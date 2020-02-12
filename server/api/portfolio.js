const router = require("express").Router();
const Holdings = require("../db/models/holdings");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allHoldings = await Holdings.findAll({ where: { id } });
    res.json(allHoldings);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
