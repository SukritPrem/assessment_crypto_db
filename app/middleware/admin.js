const { param, validationResult } = require("express-validator");

const validateAdminParamsCryptoChangeBalance = [
  param("crypto").isAlpha().withMessage("Crypto must contain only letters"),
  param("change").isAlpha().withMessage("Change must contain only letters"),
  param("balance")
    .isNumeric()
    .withMessage("Balance must be a number")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Balance must be a non-negative number");
      }
      return true;
    }),
];

const validateAdminParamsAddCryptoBalance = [
  param("crypto").isAlpha().withMessage("Crypto must contain only letters"),
  param("balance").isNumeric().withMessage("Balance must be a number"),
];

const validateAdminParamsAddExchangeRate = [
  param("From").isAlpha().withMessage("Crypto must contain only letters"),
  param("To").isAlpha().withMessage("Crypto must contain only letters"),
  param("Rate").isNumeric().withMessage("Balance must be a number"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateAdminParamsCryptoChangeBalance,
  validateAdminParamsAddCryptoBalance,
  validateAdminParamsAddExchangeRate,
  handleValidationErrors,
};
