const express = require("express");
const {
  createPlacesQuery,
  getPlacesQuery,
  removePlacesQuery,
} = require("../config/sqlConfig");

const createPlacesRouter = (dbConnection) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    let location_id = req.query.location_id;
    let places = await dbConnection.QueryData(getPlacesQuery(location_id));
    res.json(places);
  });

  router.post("/", async (req, res) => {
    let name = req.query.name;
    let location_id = req.query.location_id;
    let category_id = req.query.category_id;
    await dbConnection.QueryData(
      createPlacesQuery(name, location_id, category_id)
    );
    res.status(201).send();
  });

  router.delete("/", async (req, res) => {
    let place_id = req.query.place_id;
    await dbConnection.QueryData(removePlacesQuery(place_id));
    res.status(201).send();
  });

  return router;
};

module.exports = {
  createPlacesRouter,
};
