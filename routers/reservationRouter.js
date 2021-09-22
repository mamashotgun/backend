const express = require("express");
const { getReservationsQuery, createReservationQuery } = require("../config/sqlConfig");

const createReservationRouter = (dbConnection) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const place_id = req.query.place_id;
    const reservations = await dbConnection.QueryData(
      getReservationsQuery(place_id)
    );
    res.json(reservations);
  });

  router.post("/", async (req, res) => {
    const { place_id, course_id, start_time, end_time } = req.body;
    await dbConnection.QueryData(
      createReservationQuery(place_id, course_id, start_time, end_time)
    );
    res.status(201).send();
  });

  return router;
};

module.exports = {
  createReservationRouter,
};
