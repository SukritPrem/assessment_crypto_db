const { param, validationResult } = require("express-validator");

function validateNumber(value) {
  if (value < 0) {
    throw new Error("value must be a non-negative number");
  } else if (value > 2147483647) {
    throw new Error("value must is too much");
  }
}

const validateAdminParamsCryptoChangeBalance = [
  param("crypto")
    .isAlpha()
    .withMessage("Crypto must contain only letters")
    .isLength({ max: 9 })
    .withMessage("Crypto must be less than 10 characters"),
  param("change")
    .custom((value) => {
      const allowedValues = ["INCREASE", "DECREASE"];
      if (!value.match(/^[a-zA-Z]+$/)) {
        throw new Error("Change must contain only letters");
      } else if (!allowedValues.includes(value.toUpperCase())) {
        throw new Error("Change must be either INCREASE or DECREASE");
      }
      return true;
    })
    .withMessage("Change must be either INCREASE or DECREASE"),
  param("balance")
    .isNumeric()
    .withMessage("Balance must be a number")
    .custom((value) => {
      validateNumber(value);
      return true;
    }),
];

const validateAdminParamsAddCryptoBalance = [
  param("crypto")
    .isAlpha()
    .withMessage("Crypto must contain only letters")
    .isLength({ max: 9 })
    .withMessage("Crypto must be less than 10 characters"),
  param("balance")
    .isNumeric()
    .withMessage("Balance must be a number")
    .custom((value) => {
      validateNumber(value);
      return true;
    }),
];

const validateAdminParamsAddExchangeRate = [
  param("From")
    .isAlpha()
    .withMessage("Crypto must contain only letters")
    .isLength({ max: 9 })
    .withMessage("Crypto must be less than 10 characters"),
  param("To")
    .isAlpha()
    .withMessage("Crypto must contain only letters")
    .isLength({ max: 9 })
    .withMessage("Crypto must be less than 10 characters"),
  param("Rate")
    .isNumeric()
    .withMessage("Balance must be a number")
    .custom((value) => {
      validateNumber(value);
      return true;
    }),
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
  validateNumber,
};
