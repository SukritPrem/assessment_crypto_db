const { database } = require("../database/database");

async function addCrytoWithBalance(req, res) {
  try {
    const dB = new database();
    const result = await dB.addCrytoWithBalance(req);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(201).json("Complete insert");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { addCrytoWithBalance };
