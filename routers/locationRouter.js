const express = require("express");

const createLocationRouter = (dbConnection) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const result = await dbConnection.QueryData(`SELECT * FROM locations`);
    res.json(result);
  });

  router.post("/", async (req, res) => {
    const { name } = req.body;
    const rows = await dbConnection.QueryData(
      `INSERT INTO locations(name) VALUES('${name}') RETURNING *`
    );

    res.status(201).json({ id: rows[0].location_id });
  });

  return router;
};

module.exports = {
  createLocationRouter,
};
