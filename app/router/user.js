const express = require("express");
const router = express.Router();
const { validateUser1TranferUser2 } = require("../middleware/user");
const { handleValidationErrors } = require("../middleware/admin");

const { user1TranferUser2 } = require("../service/user/transefer");

router.put(
  "/:user1/transfer/:user2",
  validateUser1TranferUser2,
  handleValidationErrors,
  user1TranferUser2
);

module.exports = router;
