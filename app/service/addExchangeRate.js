const { pool } = require("../index");

async function addExchangeRate(req, res) {
  try {
    const result = await pool.query(
      "INSERT INTO exchangerate (cryptoFrom, cryptoTo, rate) VALUES ($1, $2, $3);",
      [req.params.From, req.params.To, req.params.Rate]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(201).json("Complete add exchange rate");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { addExchangeRate };
