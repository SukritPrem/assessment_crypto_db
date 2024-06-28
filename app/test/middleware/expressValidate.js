async function testExpressValidatorMiddleware(req, res, middlewares) {
  await Promise.all(
    middlewares.map(async (middleware) => {
      await middleware(req, res, () => undefined);
    })
  );
}

module.exports = { testExpressValidatorMiddleware };
