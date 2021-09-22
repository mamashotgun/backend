const express = require("express");
const { createReservationQuery } = require("../config/sqlConfig");

const createReservationRouter = (dbConnection, getReservationsMiddleware) => {
  const router = express.Router();

  router.get("/", getReservationsMiddleware, (req, res) => {
    res.json(res.reservations);
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
