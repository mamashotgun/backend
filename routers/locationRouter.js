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

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await dbConnection.QueryData(
      `DELETE FROM locations WHERE location_id=${id}`
    );
    res.json({ message: "DELETED" });
  });

  return router;
};

module.exports = {
  createLocationRouter,
};
