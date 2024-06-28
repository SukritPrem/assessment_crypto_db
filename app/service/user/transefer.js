const { database } = require("../../database/database");

async function user1TranferUser2(req, res) {
  try {
    const dB = new database();
    const user1 = await dB.findUserAndNameCryptoInWalletTable(
      req.params.user1,
      req.body["namecryptoFrom"]
    );

    if (user1.rowCount == 0) {
      return res
        .status(404)
        .json({ error: "Not found crypto In Wallet user1" });
    }

    if (user1.rows[0].amount - req.body["amount"] < 0) {
      return res
        .status(400)
        .json({ error: "Error enough amount for tranfer to user2" });
    }

    let amount = req.body["amount"];
    if (req.body["namecryptoFrom"] != req.body["namecryptoTo"]) {
      const rate = await dB.findLastedExchangeRateInExchangeRateTable(req);
      amount = req.body["amount"] * rate.rows[0].rate;
    }

    user1.rows[0].amount = user1.rows[0].amount - req.body["amount"];

    const user2 = await dB.findUserAndNameCryptoInWalletTable(
      req.params.user2,
      req.body["namecryptoTo"]
    );

    if (user2.rowCount == 0) {
      user2.rows[0] = {
        username: req.params.user2,
        namecrypto: req.body["namecryptoTo"],
        amount: amount,
      };
    } else {
      user2.rows[0].amount = user2.rows[0].amount + amount;
    }

    let result = await dB.updateAmountByUserNameAndCrytoNameInWalletTable(
      user1.rows[0].amount,
      user1.rows[0].username,
      user1.rows[0].namecrypto
    );

    if (result.rowCount == 0) {
      return res.status(404).json({ error: "Not found" });
    }

    result = await dB.updateAmountByUserNameAndCrytoNameInWalletTable(
      user2.rows[0].amount,
      user2.rows[0].username,
      user2.rows[0].namecrypto
    );

    if (result.rowCount == 0) {
      result = await dB.insertUsernameAndCryptoAndAmountInWalletTable(
        user2.rows[0].username,
        user2.rows[0].namecrypto,
        user2.rows[0].amount
      );
    }
    res.status(200).json(user2.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { user1TranferUser2 };
