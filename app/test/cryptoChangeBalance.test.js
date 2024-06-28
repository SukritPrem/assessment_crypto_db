const { cryptoChageBalance } = require("../service/cryptoChangeBalance"); // Assuming your function is in the same directory

// jest.mock("../database/database"); // Mock the database module
const { getMockReq, getMockRes } = require("@jest-mock/express");
jest.mock("../database/database");

test("admin increase 100 balance success", async () => {
  const { database } = require("../database/database");

  const crypto = {
    rowCount: 1,
    rows: [{ namecrypto: "Bitcoin", balance: 100 }],
  };

  database.mockImplementation(() => ({
    findCryptoByNameCrypto: jest.fn(() => Promise.resolve(crypto)),
    updateBalanceByNameCrypto: jest.fn(() =>
      Promise.resolve({
        rowCount: 1,
      })
    ),
  }));

  let { req } = getMockReq();
  const { res } = getMockRes();

  req = {
    params: { crypto: "Bitcoin", change: "increase", balance: 100 },
  };

  await cryptoChageBalance(req, res);

  expect(res.status).toHaveBeenCalledWith(200); // Assert expected error status code
  expect(res.json).toHaveBeenCalledWith({
    balance: 200,
    namecrypto: "Bitcoin",
  });
});

test("admin decrease 100 balance success", async () => {
  const { database } = require("../database/database");

  const crypto = {
    rowCount: 1,
    rows: [{ namecrypto: "Bitcoin", balance: 100 }],
  };

  database.mockImplementation(() => ({
    findCryptoByNameCrypto: jest.fn(() => Promise.resolve(crypto)),
    updateBalanceByNameCrypto: jest.fn(() =>
      Promise.resolve({
        rowCount: 1,
      })
    ),
  }));

  let { req } = getMockReq();
  const { res } = getMockRes();

  req = {
    params: { crypto: "Bitcoin", change: "decrease", balance: 100 },
  };

  await cryptoChageBalance(req, res);

  expect(res.status).toHaveBeenCalledWith(200); // Assert expected error status code
  expect(res.json).toHaveBeenCalledWith({
    balance: 0,
    namecrypto: "Bitcoin",
  });
});

test("admin decrease 1000 balance not success because balance result it's negative", async () => {
  const { database } = require("../database/database");

  const crypto = {
    rowCount: 1,
    rows: [{ namecrypto: "Bitcoin", balance: 100 }],
  };

  database.mockImplementation(() => ({
    findCryptoByNameCrypto: jest.fn(() => Promise.resolve(crypto)),
    updateBalanceByNameCrypto: jest.fn(() =>
      Promise.resolve({
        rowCount: 1,
      })
    ),
  }));

  let { req } = getMockReq();
  const { res } = getMockRes();

  req = {
    params: { crypto: "Bitcoin", change: "decrease", balance: 1000 },
  };

  await cryptoChageBalance(req, res);

  expect(res.status).toHaveBeenCalledWith(400); // Assert expected error status code
  expect(res.json).toHaveBeenCalledWith(
    "After action crypto is negative can't update"
  );
});
