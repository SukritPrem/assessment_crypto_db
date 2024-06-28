const { testExpressValidatorMiddleware } = require("./expressValidate");
const {
  validateAdminParamsCryptoChangeBalance,
} = require("../../middleware/admin");
const { getMockReq, getMockRes } = require("@jest-mock/express");
const { param, validationResult } = require("express-validator");

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
    expect(errors.array()[0].msg).toBe("Crypto must contain only letters");
    expect(errors.array()[1].msg).toBe("Change must contain only letters");
    expect(errors.array()[2].msg).toBe("Balance must be a number");
  });
});
