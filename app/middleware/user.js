const { param, check } = require("express-validator");
const { validateNumber } = require("./admin");
const validateUser1TranferUser2 = [
  param("user1")
    .isAlpha()
    .withMessage("user1 must contain only letters")
    .isLength({ max: 9, min: 1 })
    .withMessage("user1 must be at range 1-9 characters"),
  param("user2")
    .isAlpha()
    .withMessage("user2 must contain only letters")
    .isLength({ max: 9, min: 1 })
    .withMessage("user2 must be at range 1-9 characters"),
  check("namecryptoFrom")
    .isAlpha()
    .withMessage("namecryptoFrom must contain only letters")
    .isLength({ max: 9, min: 1 })
    .withMessage("namecryptoFrom must be at range 1-9 characters"),
  check("namecryptoTo")
    .isAlpha()
    .withMessage("namecryptoTo must contain only letters")
    .isLength({ max: 9, min: 1 })
    .withMessage("namecryptoFrom must be at range 1-9 characters"),
  check("amount")
    .isNumeric()
    .withMessage("amount must be a number")
    .custom((value) => {
      validateNumber(value);
      return true;
    }),
];

module.exports = { validateUser1TranferUser2 };
