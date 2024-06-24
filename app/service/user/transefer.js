const { pool } = require("../../index");

async function user1TranferUser2(req, res) {
  try {
    const user1 = await pool.query(
      "SELECT * FROM Wallet WHERE username = $1 AND namecrypto = $2;",
      [req.params.user1, req.body["namecryptoFrom"]]
    );

    if (user1.rowCount == 0) {
      return res.status(404).json({ error: "Not found" });
    }

    if (user1.rows[0].amount - req.body["amount"] < 0) {
      return res.status(400).json({ error: "Bad Request amout" });
    }

    let amount = req.body["amount"];
    if (req.body["namecryptoFrom"] != req.body["namecryptoTo"]) {
      const rate = await pool.query(
        "SELECT * FROM exchangeRate WHERE cryptoFrom = $1 AND cryptoTo = $2 ORDER BY updated_at DESC LIMIT 1;",
        [req.body["namecryptoFrom"], req.body["namecryptoTo"]]
      );
      amount = req.body["amount"] * rate.rows[0].rate;
    }

    user1.rows[0].amount = user1.rows[0].amount - req.body["amount"];

    const user2 = {
      username: req.params.user2,
      namecrypto: req.body["namecryptoTo"],
      amount: amount,
    };

    let result = await pool.query(
      "UPDATE Wallet SET amount = $1 WHERE username = $2 AND namecrypto = $3;",
      [user1.rows[0].amount, user1.rows[0].username, user1.rows[0].namecrypto]
    );

    if (result.rowCount == 0) {
      return res.status(404).json({ error: "Not found" });
    }

    result = await pool.query(
      "UPDATE Wallet SET amount = $1 WHERE username = $2 AND namecrypto = $3;",
      [user2.amount, user2.username, user2.namecrypto]
    );

    if (result.rowCount == 0) {
      result = await pool.query(
        "INSERT INTO Wallet (username, namecrypto, amount) VALUES ($1, $2, $3);",
        [user2.username, user2.namecrypto, user2.amount]
      );
    }

    if (result.rowCount == 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(user2);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { user1TranferUser2 };
