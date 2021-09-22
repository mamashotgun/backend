const express = require("express");
const {
  createPlacesQuery,
  getPlacesQuery,
  removePlacesQuery,
} = require("../config/sqlConfig");

const createPlacesRouter = (dbConnection) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const location_id = req.query.location_id;
    const category_id = req.query.category_id;

    if (!location_id) {
      res.status(400).json({ error: "No location id given!" });
    } else {
      const places = await dbConnection.QueryData(getPlacesQuery(location_id, category_id));
      res.json(places);
    }
  });

  router.post("/", async (req, res) => {
    const { name, location_id, category_id, description } = req.body;

    if (!name || !location_id || !category_id || !description) {
      res.status(400).json({ error: "Not all parameters given!" });
    } else {
      const rows = await dbConnection.QueryData(
        createPlacesQuery(name, location_id, category_id, description)
      );
      const id = rows[0].place_id;
      res.status(201).json({ id });
    }
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await dbConnection.QueryData(removePlacesQuery(id));
    res.status(201).send();
  });

  return router;
};

module.exports = {
  createPlacesRouter,
};
