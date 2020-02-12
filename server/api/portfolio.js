const router = require("express").Router();
const Holdings = require("..//db/models/holdings");

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const allHoldings = await Holdings.findAll({ where: { userId } });
    res.json(allHoldings);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
