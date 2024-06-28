const { database } = require("../database/database");

async function getTotalBalance(req, res) {
  try {
    const dB = new database();
    const result = await dB.getTotalBalance();
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getTotalBalance };
