const { testExpressValidatorMiddleware } = require("./expressValidate");
const {
  validateAdminParamsCryptoChangeBalance,
} = require("../../middleware/admin");
const { getMockReq, getMockRes } = require("@jest-mock/express");
const { validationResult } = require("express-validator");

describe("PUT admin Change Crypto Balance", () => {
  it("should false crypto,change is number and balance contain alpha", async () => {
    const req = getMockReq({
      params: { crypto: 111, change: 1, balance: "10D" },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(
      req,
      res,
      validateAdminParamsCryptoChangeBalance
    );

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe(
      "Change must be either INCREASE or DECREASE"
    );
    expect(errors.array()[1].msg).toBe("Crypto must contain only letters");
    expect(errors.array()[2].msg).toBe("Balance must be a number");
  });

  it("True case increase", async () => {
    const req = getMockReq({
      params: { crypto: "Bitcoin", change: "increase", balance: "10" },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(
      req,
      res,
      validateAdminParamsCryptoChangeBalance
    );

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it("True case decrease", async () => {
    const req = getMockReq({
      params: { crypto: "Bitcoin", change: "decrease", balance: "10" },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(
      req,
      res,
      validateAdminParamsCryptoChangeBalance
    );

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it("False case because change is Not increase or decrease And crypto alpha then 10.", async () => {
    const req = getMockReq({
      params: { crypto: "dasdasdasdasdasd", change: "Hello", balance: "10" },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(
      req,
      res,
      validateAdminParamsCryptoChangeBalance
    );

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe(
      "Change must be either INCREASE or DECREASE"
    );
    expect(errors.array()[1].msg).toBe(
      "Crypto must be less than 10 characters"
    );
  });

  it("False to much max int in balance", async () => {
    const req = getMockReq({
      params: {
        crypto: "dasd",
        change: "increase",
        balance: 2147483647 + 1,
      },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(
      req,
      res,
      validateAdminParamsCryptoChangeBalance
    );

    const errors = validationResult(req);
    // console.log(errors.array());
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe("value must is too much");
  });

  it("False to balance is negative", async () => {
    const req = getMockReq({
      params: {
        crypto: "dasd",
        change: "increase",
        balance: -1,
      },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(
      req,
      res,
      validateAdminParamsCryptoChangeBalance
    );

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe("value must be a non-negative number");
  });
});
