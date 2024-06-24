const { pool } = require("../index");

async function cryptoChageBalance(req, res) {
  try {
    const crypto = await pool.query(
      "SELECT * FROM cryptocurrency WHERE namecrypto = $1;",
      [req.params.crypto]
    );

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

    const result = await pool.query(
      "UPDATE cryptocurrency SET balance = $1 WHERE namecrypto = $2;",
      [crypto.rows[0].balance, req.params.crypto]
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
