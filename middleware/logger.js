const logMiddleWare = (req, res, next) => {
  try {
    console.log(`Got request to route: ${req.url}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    console.log(`Query params: ${JSON.stringify(req.query)}`);
    console.log(`Params: ${JSON.stringify(req.params)}`);
    next();
  } catch (error) {
    console.error(error);
    console.log("Failed to log");
    next();
  }
};

module.exports = logMiddleWare;
