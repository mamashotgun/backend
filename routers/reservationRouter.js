const express = require("express");
const {
  getReservationsQuery,
  createReservationQuery,
} = require("../config/sqlConfig");

const createReservationRouter = (dbConnection) => {
  const router = express.Router();

  const getReservationsByPlace = async (place_id) => {
    return dbConnection.QueryData(getReservationsQuery(place_id));
  };

  router.get("/", async (req, res) => {
    const place_id = req.query.place_id;
    const reservations = await getReservationsByPlace(place_id);
    res.json(reservations);
  });

  const isTimeAvailable = async (place_id, start_time, end_time) => {
    const reservations = await getReservationsByPlace(place_id);
    const start_date = Date.parse(start_time);
    const end_date = Date.parse(end_time);
    return !reservations.every(
      (reservation) =>
        reservation.start_time < start_date < reservation.end_time ||
        reservation.start_time < end_date < reservation.end_time
    );
  };

  router.post("/", async (req, res) => {
    const { place_id, course_id, start_time, end_time } = req.body;

    if (isTimeAvailable(place_id, start_time, end_time)) {
      const rows = await dbConnection.QueryData(
        createReservationQuery(place_id, course_id, start_time, end_time)
      );

      const id = rows[0].reservation_id;

      res.status(201).json({ id });
    } else {
      res.status(400).json({ message: "Time is not available" });
    }
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await dbConnection.QueryData(
      `DELETE FROM reservations WHERE reservation_id=${id}`
    );
    res.status(204).send();
  });

  return router;
};

module.exports = {
  createReservationRouter,
};
