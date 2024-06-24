const { param, validationResult } = require("express-validator");

const validateUser1TranferUser2 = [
  param("user1").isAlpha().withMessage("Crypto must contain only letters"),
  param("user2").isAlpha().withMessage("Crypto must contain only letters"),
];

module.exports = { validateUser1TranferUser2 };
