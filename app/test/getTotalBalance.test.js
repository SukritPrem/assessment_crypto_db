// const getTotalBalance = require("../service/getTotalBalance");
const { getMockReq, getMockRes } = require("@jest-mock/express");
const { getTotalBalance } = require("../service/getTotalBalance"); // Assuming your function is in the same directory
const { database } = require("../database/database");
const supertest = require("supertest");

jest.mock("../database/database"); // Mock the database module

test("getTotalBalance returns success 200 database ", async () => {
  database.mockImplementation(() => ({
    getTotalBalance: jest.fn(() =>
      Promise.resolve({
        rowCount: 1,
        rows: [
          {
            total_balance: 2000,
          },
        ],
      })
    ), // Mock successful retrieval
  }));
  const req = {};
  const { res } = getMockRes();
  await getTotalBalance(req, res);

  expect(res.status).toHaveBeenCalledWith(200); // Assert expected error status code
  expect(res.json).toHaveBeenCalledWith([
    {
      total_balance: 2000,
    },
  ]); // Assert generic error message (consider more specific error handling in practice)
});

test("getTotalBalance returns not found record in database ", async () => {
  database.mockImplementation(() => ({
    getTotalBalance: jest.fn(() =>
      Promise.resolve({
        rowCount: 0,
      })
    ), // Mock successful retrieval
  }));
  const req = {};
  const { res } = getMockRes();
  await getTotalBalance(req, res);

  expect(res.status).toHaveBeenCalledWith(404); // Assert expected error status code
});

test("should return 500 if an error occurs", async () => {
  const req = {};
  const { res } = getMockRes();
  database.mockImplementation(() => {
    return {
      getTotalBalance: jest.fn().mockRejectedValue(new Error("Database error")),
    };
  });

  await getTotalBalance(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
});
