const { application } = require("express");
const express = require("express");
const { createPlacesQuery } = require("../config/sqlConfig");

createPlacesRouter(DBConnection) = (dbConnection) => {
    const router = express.router;

    router.get('/', (req, res) => {
      let name = req.query.name;
      let location_id = req.query.location_id;
      let category_id = req.query.category_id;
      res.json(dbConnection.QueryData(createPlacesQuery(name, location_id, category_id)));
    })
}

module.exports = {
    createPlacesRouter,
  };