const express = require("express");

const createLocationRouter = (dbConnection) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const result = await dbConnection.QueryData(`SELECT * FROM locations`);
    res.json(result);
  });

  return router;
};

module.exports = {
  createLocationRouter,
};
