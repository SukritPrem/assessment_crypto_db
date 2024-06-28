const { database } = require("../database/database");

async function cryptoChageBalance(req, res) {
  try {
    const dB = new database();
    const crypto = await dB.findCryptoByNameCrypto(req.params.crypto);
    if (crypto.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    if (req.params.change == "increase") {
      crypto.rows[0].balance =
        crypto.rows[0].balance + parseFloat(req.params.balance);
    }

    if (req.params.change == "decrease") {
      crypto.rows[0].balance =
        crypto.rows[0].balance - parseFloat(req.params.balance);
    }

    if (crypto.rows[0].balance < 0)
      res.status(400).json("After action crypto is negative can't update");

    const result = await dB.updateBalanceByNameCrypto(
      crypto.rows[0].balance,
      req.params.crypto
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(crypto.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { cryptoChageBalance };
