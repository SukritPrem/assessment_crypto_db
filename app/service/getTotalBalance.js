const { pool } = require("../index");

async function getTotalBalance(req, res) {
  try {
    const result = await pool.query(
      "SELECT SUM(balance) AS total_balance FROM cryptocurrency;"
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getTotalBalance };
