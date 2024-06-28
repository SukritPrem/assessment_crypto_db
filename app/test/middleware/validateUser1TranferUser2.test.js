const { testExpressValidatorMiddleware } = require("./expressValidate");
const { validateUser1TranferUser2 } = require("../../middleware/user");
const { getMockReq, getMockRes } = require("@jest-mock/express");
const { validationResult } = require("express-validator");

describe("PUT User1 Tranfer To User2", () => {
  it("tranfer success", async () => {
    const req = getMockReq({
      params: { user1: "A", user2: "B" },
      body: {
        namecryptoFrom: "Ethereum",
        amount: 0.025,
        namecryptoTo: "Bitcoin",
      },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(req, res, validateUser1TranferUser2);
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it("tranfer false Error namecryptoTo and namecryptoFrom is To long and value is neg", async () => {
    const req = getMockReq({
      params: { user1: "A", user2: "B" },
      body: {
        namecryptoFrom: "Ethereumwqwqwqw",
        amount: "-0.025",
        namecryptoTo: "Bitcoinumwqwqwqw",
      },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(req, res, validateUser1TranferUser2);
    const errors = validationResult(req);
    // console.log(errors.array());
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe(
      "namecryptoFrom must be at range 1-9 characters"
    );
    expect(errors.array()[1].msg).toBe(
      "namecryptoFrom must be at range 1-9 characters"
    );
    expect(errors.array()[2].msg).toBe("value must be a non-negative number");
  });

  it("tranfer false Error namecryptoTo and namecryptoFrom is To long and value is neg", async () => {
    const req = getMockReq({
      params: { user1: "A", user2: "B" },
      body: {
        namecryptoFrom: "Ethereum",
        amount: 2147483647 + 1,
        namecryptoTo: "Bitcoin",
      },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(req, res, validateUser1TranferUser2);
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe("value must is too much");
  });

  it("tranfer false username  0 characters", async () => {
    const req = getMockReq({
      params: { user1: "", user2: "B" },
      body: {
        namecryptoFrom: "Ethereum",
        amount: 2147483647 + 1,
        namecryptoTo: "Bitcoin",
      },
    });
    const { res } = getMockRes();
    await testExpressValidatorMiddleware(req, res, validateUser1TranferUser2);
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe("user1 must contain only letters");
  });
});
