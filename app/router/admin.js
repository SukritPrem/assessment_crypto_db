const express = require("express");
const router = express.Router();
const { getTotalBalance } = require("../service/getTotalBalance");
const { cryptoChageBalance } = require("../service/cryptoChangeBalance");
const { addCrytoWithBalance } = require("../service/addCryptoWithBalance");
const { addExchangeRate } = require("../service/addExchangeRate");

const {
  validateAdminParamsCryptoChangeBalance,
  handleValidationErrors,
  validateAdminParamsAddCryptoBalance,
  validateAdminParamsAddExchangeRate,
} = require("../middleware/admin");

router.get("/totalBalance", async (req, res) => {
  await getTotalBalance(req, res);
});

router.put(
  "/:crypto/:change/:balance",
  validateAdminParamsCryptoChangeBalance,
  handleValidationErrors,
  cryptoChageBalance
);

router.post(
  "/add/:crypto/:balance",
  validateAdminParamsAddCryptoBalance,
  handleValidationErrors,
  addCrytoWithBalance
);

router.post(
  "/addExchangeRate/:From/:To/:Rate",
  validateAdminParamsAddExchangeRate,
  handleValidationErrors,
  addExchangeRate
);

module.exports = router;
