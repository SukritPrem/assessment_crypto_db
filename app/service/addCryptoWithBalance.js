const { pool } = require("../index");

async function addCrytoWithBalance(req, res) {
  try {
    const result = await pool.query(
      "INSERT INTO cryptocurrency (namecrypto, balance) VALUES ($1, $2);",
      [req.params.crypto, req.params.balance]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(201).json("Complete insert");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { addCrytoWithBalance };
