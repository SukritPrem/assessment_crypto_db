const { Pool } = require("pg");

class database {
  constructor() {
    console.log("create constructor");
    this.pool = new Pool({
      user: "postgres",
      host: "127.0.0.1",
      database: "cryptocurrency",
      password: "postgres",
      port: 5432,
    });
  }

  async insertCryptoAndBalace(req) {
    return this.pool.query(
      "INSERT INTO cryptocurrency (namecrypto, balance) VALUES ($1, $2);",
      [req.params.crypto, req.params.balance]
    );
  }

  async getTotalBalance() {
    console.log("dbs");
    return this.pool.query(
      "SELECT SUM(balance) AS total_balance FROM cryptocurrency;"
    );
  }
}
module.exports = { database };
