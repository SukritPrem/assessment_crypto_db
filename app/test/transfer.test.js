const { user1TranferUser2 } = require("../service/user/transefer"); // Assuming your function is in the same directory

// jest.mock("../database/database"); // Mock the database module
const { getMockReq, getMockRes } = require("@jest-mock/express");
jest.mock("../database/database");

test("user1 tranfer crypto to user2 success BitCoin to BitCoin user2 get BitCoin", async () => {
  const { database } = require("../database/database");

  const user1 = {
    rowCount: 1,
    rows: [{ username: "A", namecrypto: "Bitcoin", amount: 100 }],
  };
  const user2 = {
    rowCount: 1,
    rows: [{ username: "B", namecrypto: "Bitcoin", amount: 50 }],
  };

  database.mockImplementation(() => ({
    findUserAndNameCryptoInWalletTable: jest
      .fn()
      .mockReturnValueOnce(user1)
      .mockReturnValueOnce(user2),
    updateAmountByUserNameAndCrytoNameInWalletTable: jest.fn(() =>
      Promise.resolve({
        rowCount: 1,
      })
    ),
  }));
  let { req } = getMockReq();
  const { res } = getMockRes();

  req = {
    params: { user1: "A", user2: "B" },
    body: { amount: 5, namecryptoFrom: "Bitcoin", namecryptoTo: "Bitcoin" },
  };
  await user1TranferUser2(req, res);
  //   console.log(user1);
  expect(res.status).toHaveBeenCalledWith(200); // Assert expected error status code
  expect(res.json).toHaveBeenCalledWith({
    username: "B",
    namecrypto: "Bitcoin",
    amount: 55,
  });
  expect(user1.rows[0].amount).toBe(95);
});

test("user1 tranfer crypto to user2 success BitCoin to Ethereum user2 get Ethereum", async () => {
  const { database } = require("../database/database");

  const user1 = {
    rowCount: 1,
    rows: [{ username: "A", namecrypto: "Bitcoin", amount: 100 }],
  };
  const user2 = {
    rowCount: 1,
    rows: [{ username: "B", namecrypto: "Ethereum", amount: 50 }],
  };

  const exChangeRate = {
    rowCount: 1,
    rows: [{ cryptoFrom: "Bitcoin", cryptoTo: "Ethereum", rate: 0.025 }],
  };
  database.mockImplementation(() => ({
    findUserAndNameCryptoInWalletTable: jest
      .fn()
      .mockReturnValueOnce(user1)
      .mockReturnValueOnce(user2),
    updateAmountByUserNameAndCrytoNameInWalletTable: jest.fn(() =>
      Promise.resolve({
        rowCount: 1,
      })
    ),
    findLastedExchangeRateInExchangeRateTable: jest
      .fn()
      .mockReturnValueOnce(exChangeRate),
  }));

  let { req } = getMockReq();
  const { res } = getMockRes();

  req = {
    params: { user1: "A", user2: "B" },
    body: { amount: 5, namecryptoFrom: "Bitcoin", namecryptoTo: "Ethereum" },
  };
  await user1TranferUser2(req, res);

  expect(res.status).toHaveBeenCalledWith(200); // Assert expected error status code
  expect(res.json).toHaveBeenCalledWith({
    username: "B",
    namecrypto: "Ethereum",
    amount: 50.125,
  });
  expect(user1.rows[0].amount).toBe(95);
});

test("user1 tranfer crypto to user2 not success because user1 not have enought amount", async () => {
  const { database } = require("../database/database");

  const user1 = {
    rowCount: 1,
    rows: [{ username: "A", namecrypto: "Bitcoin", amount: 0 }],
  };
  const user2 = {
    rowCount: 1,
    rows: [{ username: "B", namecrypto: "Ethereum", amount: 50 }],
  };

  const exChangeRate = {
    rowCount: 1,
    rows: [{ cryptoFrom: "Bitcoin", cryptoTo: "Ethereum", rate: 0.025 }],
  };
  database.mockImplementation(() => ({
    findUserAndNameCryptoInWalletTable: jest
      .fn()
      .mockReturnValueOnce(user1)
      .mockReturnValueOnce(user2),
    updateAmountByUserNameAndCrytoNameInWalletTable: jest.fn(() =>
      Promise.resolve({
        rowCount: 1,
      })
    ),
    findLastedExchangeRateInExchangeRateTable: jest
      .fn()
      .mockReturnValueOnce(exChangeRate),
  }));

  let { req } = getMockReq();
  const { res } = getMockRes();

  req = {
    params: { user1: "A", user2: "B" },
    body: { amount: 5, namecryptoFrom: "Bitcoin", namecryptoTo: "Ethereum" },
  };
  await user1TranferUser2(req, res);
  //   console.log(user1);
  expect(res.status).toHaveBeenCalledWith(400); // Assert expected error status code
  expect(res.json).toHaveBeenCalledWith({
    error: "Error enough amount for tranfer to user2",
  });
});

test("If walletTable not have crypto of user2", async () => {
  const { database } = require("../database/database");

  const user1 = {
    rowCount: 1,
    rows: [{ username: "A", namecrypto: "Bitcoin", amount: 10 }],
  };

  const user2 = {
    rowCount: 0,
    rows: [],
  };
  const exChangeRate = {
    rowCount: 1,
    rows: [{ cryptoFrom: "Bitcoin", cryptoTo: "Ethereum", rate: 0.025 }],
  };
  database.mockImplementation(() => ({
    findUserAndNameCryptoInWalletTable: jest
      .fn()
      .mockReturnValueOnce(user1)
      .mockReturnValueOnce(user2),
    updateAmountByUserNameAndCrytoNameInWalletTable: jest.fn(() =>
      Promise.resolve({
        rowCount: 1,
      })
    ),
    findLastedExchangeRateInExchangeRateTable: jest
      .fn()
      .mockReturnValueOnce(exChangeRate),
  }));

  let { req } = getMockReq();
  const { res } = getMockRes();

  req = {
    params: { user1: "A", user2: "B" },
    body: { amount: 5, namecryptoFrom: "Bitcoin", namecryptoTo: "Ethereum" },
  };

  await user1TranferUser2(req, res);
  expect(res.status).toHaveBeenCalledWith(200); // Assert expected error status code
  expect(res.json).toHaveBeenCalledWith({
    username: "B",
    namecrypto: "Ethereum",
    amount: 0.125,
  });
});
