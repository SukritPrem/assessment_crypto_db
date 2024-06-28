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
    return this.pool.query(
      "SELECT SUM(balance) AS total_balance FROM cryptocurrency;"
    );
  }

  async addCrytoWithBalance(req) {
    return this.pool.query(
      "INSERT INTO cryptocurrency (namecrypto, balance) VALUES ($1, $2);",
      [req.params.crypto, req.params.balance]
    );
  }

  async addExchangeRate(req) {
    return this.pool.query(
      "INSERT INTO exchangerate (cryptoFrom, cryptoTo, rate) VALUES ($1, $2, $3);",
      [req.params.From, req.params.To, req.params.Rate]
    );
  }

  async findUserAndNameCryptoInWalletTable(nameUser, nameCryto) {
    return this.pool.query(
      "SELECT * FROM Wallet WHERE username = $1 AND namecrypto = $2;",
      [nameUser, nameCryto]
    );
  }

  async findLastedExchangeRateInExchangeRateTable(req) {
    return this.pool.query(
      "SELECT * FROM exchangeRate WHERE cryptoFrom = $1 AND cryptoTo = $2 ORDER BY updated_at DESC LIMIT 1;",
      [req.body["namecryptoFrom"], req.body["namecryptoTo"]]
    );
  }

  async updateAmountByUserNameAndCrytoNameInWalletTable(
    amount,
    username,
    namecrypto
  ) {
    return this.pool.query(
      "UPDATE Wallet SET amount = $1 WHERE username = $2 AND namecrypto = $3;",
      [amount, username, namecrypto]
    );
  }

  async insertUsernameAndCryptoAndAmountInWalletTable(
    username,
    namecrypto,
    amount
  ) {
    return this.pool.query(
      "INSERT INTO Wallet (username, namecrypto, amount) VALUES ($1, $2, $3);",
      [username, namecrypto, amount]
    );
  }

  async findCryptoByNameCrypto(nameCryto) {
    return this.pool.query(
      "SELECT * FROM cryptocurrency WHERE namecrypto = $1;",
      [nameCryto]
    );
  }

  async updateBalanceByNameCrypto(balance, namecrypto) {
    return this.pool.query(
      "UPDATE cryptocurrency SET balance = $1 WHERE namecrypto = $2;",
      [balance, namecrypto]
    );
  }
}
module.exports = { database };
